// Correct way to use params in App Router API routes
import connect from '@/lib/db';
import Template from '@/lib/models/template';
import { NextRequest } from 'next/server';

export async function GET(
  req: NextRequest,
  context: { params: { userId: string } }
) {
  const { userId } = context.params;

  await connect();
  const templates = await Template.find({ userId }, 'degreeName');
  return new Response(JSON.stringify(templates), { status: 200 });
}

export async function POST(
  req: NextRequest,
  context: { params: { userId: string } }
) {
  const data = await req.json();
  const { degreeName, elements, backgroundImage, originalWidth, originalHeight } = data;

  const { userId } = context.params;

  await connect();

  const existing = await Template.findOne({ degreeName, userId });

  if (existing) {
    existing.elements = elements;
    existing.backgroundImage = backgroundImage;
    existing.originalWidth = originalWidth;
    existing.originalHeight = originalHeight;
    await existing.save();
    return Response.json({ message: 'Template updated' });
  }

  await Template.create({ 
    degreeName, 
    elements, 
    backgroundImage,
    originalWidth,
    originalHeight,
    userId
  });

  return Response.json({ message: 'Template saved' });
}
