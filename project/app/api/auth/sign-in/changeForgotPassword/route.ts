import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import connect from "@/lib/db"; // adjust if your db connect path differs
import User from "@/lib/models/user"; // adjust if your model path differs

export async function POST(req: Request) {
  try {
    await connect();

    const { email, otp, newPassword } = await req.json();

    if (!email || !otp || !newPassword) {
      return NextResponse.json(
        {
          heading: "Invalid Request",
          message: "Email, OTP, and new password are required.",
        },
        { status: 400 }
      );
    }

    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      return NextResponse.json(
        {
          heading: "User Not Found",
          message: "No account was found for the provided email.",
        },
        { status: 404 }
      );
    }

    if (
      !existingUser.resetPasswordOTP ||
      existingUser.resetPasswordOTP !== otp
    ) {
      return NextResponse.json(
        {
          heading: "Invalid OTP",
          message: "The OTP you entered is incorrect.",
        },
        { status: 400 }
      );
    }

    if (
      !existingUser.resetPasswordOTPExpires ||
      new Date() > new Date(existingUser.resetPasswordOTPExpires)
    ) {
      return NextResponse.json(
        {
          heading: "OTP Expired",
          message: "The OTP has expired. Please request a new one.",
        },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    existingUser.password = hashedPassword;
    existingUser.resetPasswordOTP = "";

    await existingUser.save();

    return NextResponse.json(
      {
        message: "Your password has been reset successfully.",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error resetting password:", error);
    return NextResponse.json(
      {
        heading: "Internal Server Error",
        message: "An unexpected error occurred. Please try again later.",
      },
      { status: 500 }
    );
  }
}
