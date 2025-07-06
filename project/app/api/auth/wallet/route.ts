import { NextResponse } from "next/server";
import connect from "@/lib/db";
import User from "@/lib/models/user";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { userId, walletAddress } = body;

    // Validation
    if (!userId || !walletAddress) {
      return NextResponse.json(
        {
          heading: "Missing Required Fields",
          message: "Both userId and walletAddress are required.",
        },
        { status: 400 }
      );
    }

    await connect();

    // Find user
    const user = await User.findOne({ id: userId });
    if (!user) {
      return NextResponse.json(
        {
          heading: "User Not Found",
          message: "No account found with the provided user ID.",
        },
        { status: 404 }
      );
    }

    if(user.walletAddress != walletAddress) {
        return NextResponse.json(
      {
        message: "Wallet Address Mismatch."
      },
      { status: 409 })
    }

    if(user.walletAddress) {
         return NextResponse.json(
      {
        message: "Already the wallet address has been stored."
      },
      { status: 200 })
    }

    // Update wallet address
    user.walletAddress = walletAddress;
    await user.save();

    return NextResponse.json(
      {
        message: "Wallet address updated successfully."
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Wallet update failed:", error);
    return NextResponse.json(
      {
        heading: "Internal Server Error",
        message: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}
