import { NextResponse } from 'next/server';
import connect from '@/lib/db';
import User from '@/lib/models/user';
import bcrypt from 'bcryptjs';
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';


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
      const adminToken = crypto.randomBytes(32).toString('hex');
      const envPath = path.resolve(process.cwd(), '.env');
      let envContent = '';
      if (fs.existsSync(envPath)) {
              envContent = fs.readFileSync(envPath, 'utf-8');
              const regex = /^ADMIN_SESSION_TOKEN=.*$/m;
              if (regex.test(envContent)) {
                envContent = envContent.replace(regex, `ADMIN_SESSION_TOKEN=${adminToken}`);
              } else {
                envContent += `\nADMIN_SESSION_TOKEN=${adminToken}`;
              }
            } else {
              envContent = `ADMIN_SESSION_TOKEN=${adminToken}`;
            }
      fs.writeFileSync(envPath, envContent);
      return NextResponse.json(
        { isAdmin: true, token: adminToken, redirect: 'auth/admincertara/signup/' },
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

    return NextResponse.json({ message: "Login successful", userID: user.id, flag: user.flagFirstLogin, orgName: user.orgName, logo: user.logo, email: user.email }, { status: 200 });

  } catch (err) {
    console.error("Login error:", err);
    return NextResponse.json({ heading: "Internal Server Error", message: "An unexpected error occurred. Please try again later." }, { status: 500 });
  }
}