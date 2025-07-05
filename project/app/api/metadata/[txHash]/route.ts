import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest, { params }: { params: { txHash: string } }) {
  const txHash = params.txHash;
  const API_KEY = process.env.NEXT_PUBLIC_BLOCKFROST_PROJECT_ID;

  if (!API_KEY) {
    return NextResponse.json({ error: 'Blockfrost project ID not configured' }, { status: 500 });
  }

  const METADATA_URL = `https://cardano-preprod.blockfrost.io/api/v0/txs/${txHash}/metadata`;
  const UTXO_URL = `https://cardano-preprod.blockfrost.io/api/v0/txs/${txHash}/utxos`;

  try {
    // Fetch metadata
    const metadataRes = await fetch(METADATA_URL, {
      headers: { project_id: API_KEY },
    });

    if (!metadataRes.ok) {
      return NextResponse.json({ error: `Metadata fetch failed: ${metadataRes.status}` }, { status: metadataRes.status });
    }

    const metadata = await metadataRes.json();
    const metadata721 = metadata.find((item: any) => item.label === '721');
    if (!metadata721) {
      return NextResponse.json({ error: 'No CIP-721 metadata found.' }, { status: 404 });
    }

    const jsonMetadata = metadata721.json_metadata;
    const policyIds = Object.keys(jsonMetadata);
    if (policyIds.length === 0) {
      return NextResponse.json({ error: 'No policy IDs in metadata.' }, { status: 404 });
    }

    const policyId = policyIds[0];
    const assets = jsonMetadata[policyId];
    const assetNames = Object.keys(assets);
    if (assetNames.length === 0) {
      return NextResponse.json({ error: 'No assets found in metadata.' }, { status: 404 });
    }

    const assetName = assetNames[0];
    const certificate = assets[assetName];

    // Fetch UTXOs
    const utxoRes = await fetch(UTXO_URL, {
      headers: { project_id: API_KEY },
    });

    if (!utxoRes.ok) {
      return NextResponse.json({ error: `UTXO fetch failed: ${utxoRes.status}` }, { status: utxoRes.status });
    }

    const utxoData = await utxoRes.json();

    // Get the first input address (assumed to be sender)
    const senderAddress = utxoData.inputs?.[0]?.address;

    return NextResponse.json({
      certificate,
      address: senderAddress || null,
    });
  } catch (error: any) {
    return NextResponse.json({ error: 'Internal Server Error: ' + error.message }, { status: 500 });
  }
}
