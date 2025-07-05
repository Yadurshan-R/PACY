// app/api/change-password/route.ts
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import connect from "@/lib/db";
import User from "@/lib/models/user";

export const POST = async (request: Request) => {
  try {
    // Parse JSON body
    const body = await request.json();
    const { userId, newPassword } = body;

    // Validate input
    if (!userId || !newPassword) {
      return NextResponse.json(
        { heading: "Missing Fields", message: "User ID and new password are required." },
        { status: 400 }
      );
    }

    if (newPassword.length < 8) {
      return NextResponse.json(
        { heading: "Invalid Password", message: "Password must be at least 8 characters long." },
        { status: 400 }
      );
    }

    await connect();

    // Find user by id
    const user = await User.findOne({ id: userId });
    if (!user) {
      return NextResponse.json(
        { heading: "Not Found", message: "User not found." },
        { status: 404 }
      );
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update user password and flagFirstLogin
    user.password = hashedPassword;
    user.flagFirstLogin = false;

    await user.save();

    return NextResponse.json(
      { message: "Password updated successfully." },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating password:", error);
    return NextResponse.json(
      {
        heading: "Internal Server Error",
        message: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
};
