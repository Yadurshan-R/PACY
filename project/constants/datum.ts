// /constants/datum.ts
import { Data, resolvePaymentKeyHash } from '@meshsdk/core';

export async function buildCertificateDatum(
  wallet: any,
  studentName: string,
  nic: string,
  course: string,
  issuedDate: string
): Promise<Data> {
  const usedAddresses = await wallet.getUsedAddresses();
  const address = usedAddresses[0];
  const pkh = resolvePaymentKeyHash(address);

  return {
    alternative: 0,
    fields: [
      Buffer.from(studentName).toString('hex'),
      Buffer.from(course).toString('hex'),
      Buffer.from(issuedDate).toString('hex'),
      pkh,
    ],
  };
}
