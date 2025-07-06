import { NextResponse } from "next/server";
import connect from "@/lib/db";
import UserCourseRecord from "@/lib/models/userRecord";

export async function POST(req: Request) {
  await connect();

  try {
    const body = await req.json();
    const { userId, courseId } = body;

    if (!userId || !courseId) {
      return NextResponse.json(
        { error: "userId and courseId are required" },
        { status: 400 }
      );
    }

    // Find the user
    const record = await UserCourseRecord.findOne(
      { userId }
    );

    if (!record) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Find the course by courseId
    const course = record.courses.find(
      (c) => c.courseId === courseId
    );

    if (!course) {
      return NextResponse.json({ error: "Course not found" }, { status: 404 });
    }

    return NextResponse.json({ candidates: course.candidates });
  } catch (error) {
    console.error("Error fetching candidates:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
