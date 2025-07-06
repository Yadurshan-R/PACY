import { NextRequest, NextResponse } from 'next/server';
import connect from '@/lib/db';
import User from '@/lib/models/user';

export async function GET(req: NextRequest, { params }: { params: { txHash: string } }) {
  const txHash = params.txHash;
  const API_KEY = process.env.NEXT_PUBLIC_BLOCKFROST_PROJECT_ID;

  console.log('Received txHash:', txHash);

  if (!API_KEY) {
    console.error('Blockfrost API key not found');
    return NextResponse.json({ error: 'Blockfrost project ID not configured' }, { status: 500 });
  }

  const METADATA_URL = `https://cardano-preprod.blockfrost.io/api/v0/txs/${txHash}/metadata`;
  const UTXO_URL = `https://cardano-preprod.blockfrost.io/api/v0/txs/${txHash}/utxos`;

  try {
    await connect();
    console.log('Connected to MongoDB');

    // Fetch metadata
    const metadataRes = await fetch(METADATA_URL, {
      headers: { project_id: API_KEY },
    });

    if (!metadataRes.ok) {
      console.error('Failed to fetch metadata:', metadataRes.status);
      return NextResponse.json({ error: `Metadata fetch failed: ${metadataRes.status}` }, { status: metadataRes.status });
    }

    const metadata = await metadataRes.json();
    const metadata721 = metadata.find((item: any) => item.label === '721');
    if (!metadata721) {
      console.warn('No CIP-721 metadata found');
      return NextResponse.json({ error: 'No CIP-721 metadata found.' }, { status: 404 });
    }

    const jsonMetadata = metadata721.json_metadata;
    const policyIds = Object.keys(jsonMetadata);
    if (policyIds.length === 0) {
      console.warn('No policy IDs in metadata');
      return NextResponse.json({ error: 'No policy IDs in metadata.' }, { status: 404 });
    }

    const policyId = policyIds[0];
    const assets = jsonMetadata[policyId];
    const assetNames = Object.keys(assets);
    if (assetNames.length === 0) {
      console.warn('No assets in metadata');
      return NextResponse.json({ error: 'No assets found in metadata.' }, { status: 404 });
    }

    const assetName = assetNames[0];
    const certificate = assets[assetName];

    // Fetch UTXO data
    const utxoRes = await fetch(UTXO_URL, {
      headers: { project_id: API_KEY },
    });

    if (!utxoRes.ok) {
      console.error('Failed to fetch UTXOs:', utxoRes.status);
      return NextResponse.json({ error: `UTXO fetch failed: ${utxoRes.status}` }, { status: utxoRes.status });
    }

    const utxoData = await utxoRes.json();
    const senderAddress = utxoData.inputs?.[0]?.address;
    console.log('Sender address:', senderAddress);

    if (!senderAddress) {
      console.warn('No sender address found in transaction inputs');
      return NextResponse.json({ error: 'Sender address not found in transaction inputs.' }, { status: 404 });
    }

    // Find matching user
    const users = await User.find({});
    console.log('All user wallet addresses:', users.map(u => u.walletAddress));
    
    const matchedUser = users.find(user => user.walletAddress === senderAddress);
    console.log('Matched user:', matchedUser ? matchedUser.email : 'No match found');

    if (!matchedUser) {
      return NextResponse.json({ error: 'Invalid request: sender address not recognized' }, { status: 400 });
    }

    return NextResponse.json({
      certificate,
      address: senderAddress,
      user: {
        orgName: matchedUser.orgName,
        email: matchedUser.email,
        location: matchedUser.location,
        logo: matchedUser.logo,
      },
    });
  } catch (error: any) {
    console.error('Unhandled server error:', error.message);
    return NextResponse.json({ error: 'Internal Server Error: ' + error.message }, { status: 500 });
  }
}
