export const runtime = "nodejs";

import { NextRequest, NextResponse } from "next/server";
import { sendOTPEmail } from "./mailto";
import User from "@/lib/models/user";
import connect from "@/lib/db";
import bcrypt from "bcryptjs";
import { v4 as uuidv4 } from "uuid";

const ADMIN_TOKEN = process.env.ADMIN_SESSION_TOKEN;

function generateOTP(length = 8): string {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let otp = "";
  for (let i = 0; i < length; i++) {
    otp += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return otp;
}

export async function POST(request: NextRequest) {
  try {
    const token = request.headers.get("authorization");
    if (!token || token !== `Bearer ${ADMIN_TOKEN}`) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    const body = await request.json();
    const { orgName, location, contactNo, email, logo } = body;

    // Validation
    if (!orgName || !email || !location || !contactNo || !logo) {
      return NextResponse.json(
        {
          heading: "Missing Required Fields",
          message: "Some required information is missing. Make sure all fields are filled.",
        },
        { status: 400 }
      );
    }

    await connect();

    // Check for existing user
    const existingUser = await User.findOne({
      $or: [
        { email },
        { $and: [{ orgName }, { location }] },
      ],
    });

    if (existingUser) {
      console.log("User Exisitng");
      return NextResponse.json(
        {
          heading: "Conflict",
          message: "A user with this email or organization/location already exists.",
        },
        { status: 409 }
      );
    }

    
    const otp = generateOTP();

    // Hash OTP
    const hashedOtp = await bcrypt.hash(otp, 10);

    // Create user
    const newUser = new User({
      id: uuidv4(),
      orgName,
      location,
      contactNo,
      email,
      password: hashedOtp,
      flagFirstLogin: true,
      logo,
    });

    await newUser.save();
    await sendOTPEmail({ to: email, otp })

    return NextResponse.json(
      {
        message: "Signup successful. OTP sent to email.",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Signup error:", error);
    return NextResponse.json(
      {
        heading: "Internal Server Error",
        message: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}
