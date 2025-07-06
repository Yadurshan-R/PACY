export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { sendOTPEmail } from "./mailto";
import User from "@/lib/models/user";
import connect from "@/lib/db";

function generateOTP(length = 8): string {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let otp = "";
  for (let i = 0; i < length; i++) {
    otp += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return otp;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email } = body;

    // Validation
    if ( !email ) {
      return NextResponse.json(
        {
          heading: "Missing Email address",
          message: "Enter the signin email address to reset password.",
        },
        { status: 400 }
      );
    }

    await connect();

    // Check for existing user
    const user = await User.findOne({ email });

     if (!user) {
      return NextResponse.json(
        {   heading: "User not Found",
            message: "No account found with this email address." },
        { status: 404 }
      );
    }

    
    const otp = generateOTP();
    await sendOTPEmail({ to: email, otp })

    user.resetPasswordOTP = otp;
    user.resetPasswordOTPExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 min expiry
    await user.save();
    return NextResponse.json(
      {
        message: "Request to change password successful. OTP sent to email.",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Request to change password failed:", error);
    return NextResponse.json(
      {
        heading: "Internal Server Error",
        message: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}
