// /lib/mintCertificate.ts
import {
  Transaction,
  Data,
  AssetMetadata,
} from '@meshsdk/core';
import { scriptAddress } from '@/constants/script';
import { buildCertificateDatum } from '@/constants/datum';

export async function mintCertificate(
  wallet: any,
  metadata: AssetMetadata,
  studentName: string,
  course: string,
  date: string
): Promise<{ txHash: string; assetName: string }> {
  const datum: Data = await buildCertificateDatum(wallet, studentName, course, date);

  const redeemer: Data = {
    alternative: 0,
    fields: [Buffer.from('mint').toString('hex')],
  };

  const tx = new Transaction({ initiator: wallet });

  tx.sendLovelace(
    {
      address: scriptAddress,
      datum: { value: datum },
    },
    '2000000'
  );

  const assetName = `CERT-${Date.now()}`;
  tx.setMetadata(721, {
    [scriptAddress]: {
      [assetName]: metadata,
    },
  });

  const changeAddress = await wallet.getChangeAddress(); // ✅ Safe now
  tx.setRequiredSigners([changeAddress]);
  console.log("Building datum and transaction...");

  console.log("Building transaction...");
  const unsignedTx = await tx.build();
  console.log("Signing transaction...");
  const signedTx = await wallet.signTx(unsignedTx, true);
  console.log("Submitting transaction...");
  const txHash = await wallet.submitTx(signedTx);

  return {
    txHash,
    assetName,
  };
}
