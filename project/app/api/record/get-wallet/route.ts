import { NextResponse } from "next/server";
import connect from "@/lib/db";
import User from "@/lib/models/user";

export async function GET() {
  await connect();

  try {
    // Find all users, projecting only orgName and walletAddress
    const users = await User.find({}, { orgName: 1, walletAddress: 1, _id: 0 });

    return NextResponse.json({ users });
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
