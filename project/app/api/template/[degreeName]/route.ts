// /app/api/template/[degreeName]/route.ts
import connect from '@/lib/db';
import Template from '@/lib/models/template';

export async function GET(req: Request, { params }: { params: { degreeName: string } }) {
  await connect();
  const template = await Template.findOne({ degreeName: decodeURIComponent(params.degreeName) });

  if (!template) {
    return new Response('Template not found', { status: 404 });
  }

  return Response.json(template);
}
