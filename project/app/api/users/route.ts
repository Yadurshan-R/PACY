import { NextRequest, NextResponse } from 'next/server';
import connect from '@/lib/db';
import User from '@/lib/models/user';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET!;

export async function GET(req: NextRequest) {
  const authHeader = req.headers.get('authorization');

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return NextResponse.json({ message: 'No token provided' }, { status: 401 });
  }

  const token = authHeader.split(' ')[1];

  try {
    jwt.verify(token, JWT_SECRET);
    await connect();

    const users = await User.find({}, 'firstName lastName'); // get only names
    const names = users.map(user => `${user.firstName} ${user.lastName}`);

    return NextResponse.json({ names });

  } catch (err) {
    console.error('Token or DB error:', err);
    return NextResponse.json({ message: 'Invalid token or server error' }, { status: 401 });
  }
}
