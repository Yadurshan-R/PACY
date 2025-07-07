import connect from '@/lib/db';
import Template from '@/lib/models/template';
import { NextRequest } from 'next/server';

export async function GET(
  req: NextRequest,
  { params }: { params: { userId: string; degreeName: string } }
) {
  const { userId, degreeName } = params;

  await connect();

  const template = await Template.findOne({
    userId,
    degreeName: decodeURIComponent(degreeName),
  });

  if (!template) {
    return new Response('Template not found', { status: 404 });
  }

  return Response.json(template);
}
