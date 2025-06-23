import { NextResponse } from 'next/server';
import connect from '@/lib/db';
import User from '@/lib/models/user';
import bcrypt from 'bcryptjs';

export async function POST(req: Request) {
  try {
    const { firstName, lastName, phoneNo, email, password } = await req.json();

    if (!email || !password || !firstName || !lastName || !phoneNo) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
    }

    await connect();

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ message: "User already exists" }, { status: 409 });
    }

    // Hash password to store in verificationCode (since your model doesn't have a password field, we can extend or use verificationCode as demo)
    const hashedCode = await bcrypt.hash(password, 10);

    // Create user
   const newUser = new User({
  id: crypto.randomUUID(),
  firstName,
  lastName,
  phoneNo,
  email,
  password: hashedCode,   // store hashed password here
  // verificationCode: ... (if you still need it separately)
});


    await newUser.save();

    return NextResponse.json({ message: "User created successfully" }, { status: 201 });

  } catch (err) {
    console.error("Signup error:", err);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
