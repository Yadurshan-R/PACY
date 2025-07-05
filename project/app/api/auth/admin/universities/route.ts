import { NextResponse } from "next/server"
import dbConnect from "@/lib/db"
import User from "@/lib/models/user"

// If you don't have dbConnect, create a helper in lib/db.ts
// that calls mongoose.connect(process.env.MONGO_URI)

export async function GET() {
  try {
    // Ensure DB connection
    await dbConnect()

    // Fetch all users
    const users = await User.find({}, "-password").lean()

    // Map them to match your frontend interface naming
    const universities = users.map((user) => ({
      id: user.id,
      universityName: user.orgName,
      location: user.location,
      email: user.email,
      contactNumber: user.contactNo,
      logo: user.logo || null,
    }))

    return NextResponse.json(
      { universities },
      { status: 200 }
    )
  } catch (error) {
    console.error("Error fetching organizations:", error)
    return NextResponse.json(
      { error: "Failed to fetch organizations" },
      { status: 500 }
    )
  }
}
