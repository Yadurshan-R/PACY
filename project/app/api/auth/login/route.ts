import { NextResponse } from 'next/server';
import connect from '@/lib/db';
import User from '@/lib/models/user';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';


const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
const JWT_SECRET = process.env.JWT_SECRET!;

export async function POST(req: Request) {
  try {
    console.log("User fetch started");
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ message: "Email and password required" }, { status: 400 });
    }

    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
        return NextResponse.json(
        { isAdmin: true, redirect: '/admin/signup' },
        { status: 200 }
      );
    }

    await connect();

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ message: "Invalid email" }, { status: 401 });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json({ message: "Password does not match" }, { status: 401 });
    }

    // Create JWT
    const token = jwt.sign({
      id: user.id,
      email: user.email,
    }, JWT_SECRET, { expiresIn: '1h' });

    return NextResponse.json({ message: "Login successful", token });

  } catch (err) {
    console.error("Login error:", err);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
