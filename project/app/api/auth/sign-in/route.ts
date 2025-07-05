import { NextResponse } from 'next/server';
import connect from '@/lib/db';
import User from '@/lib/models/user';
import bcrypt from 'bcryptjs';


const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ message: "Email and password required" }, { status: 400 });
    }

    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
        console.log("Logged as Admin");
        return NextResponse.json(
        { isAdmin: true, redirect: 'auth/admincertara/signup/' },
        { status: 200 }
      );
    }

    await connect();

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ heading: "Authentication Failed" ,message: "We couldn't find an account with that email." }, { status: 401 });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json({ heading: "Authentication Failed", message: "The password you entered is incorrect." }, { status: 401 });
    }

    return NextResponse.json({ message: "Login successful", userID: user.id, flag: user.flagFirstLogin }, { status: 200 });

  } catch (err) {
    console.error("Login error:", err);
    return NextResponse.json({ heading: "Internal Server Error", message: "An unexpected error occurred. Please try again later." }, { status: 500 });
  }
}