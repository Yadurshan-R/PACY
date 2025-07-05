// /utils/metadataBuilder.ts
export function buildCertificateMetadata(
  studentName: string,
  nic: string,
  course: string,
  date: string,
) {
  return {
    name: studentName,
    description: `Certificate for ${studentName} in ${course}`,
    nic: nic,
    degree: course,
    issued: date,
  };
}
