import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import UserCourseRecord from "@/lib/models/userRecord";

export async function POST(req: Request) {
  await connectDB();

  try {
    const body = await req.json();
    const {
      userId,
      courseName,
      candidateName,
      nicNumber,
      dateIssued,
      blockHash,
    } = body;

    if (!userId || !courseName || !candidateName || !nicNumber || !dateIssued || !blockHash) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // Try to find existing user record
    let record = await UserCourseRecord.findOne({ userId });

    if (!record) {
      // Create new user record with this course and candidate
      record = new UserCourseRecord({
        userId,
        courses: [
          {
            courseId: "1",
            courseName,
            candidates: [
              {
                candidateName,
                nicNumber,
                dateIssued,
                blockHash,
              },
            ],
          },
        ],
      });

      await record.save();

      return NextResponse.json({ message: "New user, course, and candidate created" });
    }

    // User exists
    // Find if course exists
    let course = record.courses.find((c) => c.courseName === courseName);

    if (!course) {
      // Determine next courseId
      const existingIds = record.courses.map((c) => parseInt(c.courseId, 10) || 0);
      const nextId = (existingIds.length ? Math.max(...existingIds) : 0) + 1;

      // Add new course
      record.courses.push({
        courseId: `${nextId}`,
        courseName,
        candidates: [
          {
            candidateName,
            nicNumber,
            dateIssued,
            blockHash,
          },
        ],
      });

      await record.save();
      return NextResponse.json({ message: "New course and candidate added" });
    }

    // Course exists - add candidate
    course.candidates.push({
      candidateName,
      nicNumber,
      dateIssued,
      blockHash,
    });

    await record.save();
    return NextResponse.json({ message: "Candidate added to existing course" });
  } catch (error) {
    console.error("Error adding candidate:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
