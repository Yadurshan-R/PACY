import connect from '@/lib/db';
import Template from '@/lib/models/template';

export async function POST(req: Request) {
  const data = await req.json();
  const { degreeName, elements, backgroundImage } = data;

  await connect();

  const existing = await Template.findOne({ degree: degreeName });

if (existing) {
  existing.elements = elements;
  existing.backgroundImage = backgroundImage;
  await existing.save();
  return Response.json({ message: 'Template updated' });
}

await Template.create({ degree: degreeName, elements, backgroundImage });

  return Response.json({ message: 'Template saved' });
}

export async function GET(req: Request) {
  await connect();
  const templates = await Template.find({}, 'degree');
  return new Response(JSON.stringify(templates), { status: 200 });
}


