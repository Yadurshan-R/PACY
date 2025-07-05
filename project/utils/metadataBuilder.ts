// /utils/metadataBuilder.ts
export function buildCertificateMetadata(
  studentName: string,
  course: string,
  date: string,
) {
  return {
    name: studentName,
    description: `Certificate for ${studentName} in ${course}`,
    degree: course,
    issued: date,
  };
}
