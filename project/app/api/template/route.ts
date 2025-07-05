import connect from '@/lib/db';
import Template from '@/lib/models/template';

// In your API route (app/api/template/route.ts)
export async function POST(req: Request) {
  const data = await req.json();
  const { degreeName, elements, backgroundImage, originalWidth, originalHeight } = data;

  await connect();

  const existing = await Template.findOne({ degreeName: degreeName });

  if (existing) {
    existing.elements = elements;
    existing.backgroundImage = backgroundImage;
    existing.originalWidth = originalWidth;
    existing.originalHeight = originalHeight;
    await existing.save();
    return Response.json({ message: 'Template updated' });
  }

  await Template.create({ 
    degreeName: degreeName, 
    elements, 
    backgroundImage,
    originalWidth,
    originalHeight
  });

  return Response.json({ message: 'Template saved' });
}

export async function GET(req: Request) {
  await connect();
  const templates = await Template.find({}, 'degreeName');
  return new Response(JSON.stringify(templates), { status: 200 });
}


