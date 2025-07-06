// app/api/get-courses/route.ts

import { NextResponse } from "next/server";
import connect from "@/lib/db";
import UserCourseRecord from "@/lib/models/userRecord";

export async function POST(req: Request) {
  await connect();

  try {
    const body = await req.json();
    const { userId } = body;

    if (!userId) {
      return NextResponse.json({ error: "userId is required" }, { status: 400 });
    }

    // Fetch the document
    const record = await UserCourseRecord.findOne(
      { userId }   );

    if (!record) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Map only courseId and courseName
    const courses = record.courses.map((course) => ({
      courseId: course.courseId,
      courseName: course.courseName,
    }));

    return NextResponse.json({ courses });
  } catch (error) {
    console.error("Error fetching courses:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
