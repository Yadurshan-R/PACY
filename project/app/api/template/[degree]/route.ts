// /app/api/templates/[degree]/route.ts
import connect from '@/lib/db';
import Template from '@/lib/models/template';

export async function GET(req: Request, { params }: { params: { degree: string } }) {
  await connect();
  const template = await Template.findOne({ degree: decodeURIComponent(params.degree) });

  if (!template) {
    return new Response('Template not found', { status: 404 });
  }

  return Response.json(template);
}
