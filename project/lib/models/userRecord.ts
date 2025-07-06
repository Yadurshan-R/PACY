import mongoose from "mongoose";

const { Schema, model, models } = mongoose;

// Candidate schema (nested inside courses)
const CandidateSchema = new Schema({
  candidateName: {
    type: String,
    required: true,
  },
  nicNumber: {
    type: String,
    required: true,
  },
  dateIssued: {
    type: String,
  },
  blockHash: {
    type: String,
    required: true,}
});

// Course schema (nested inside user)
const CourseSchema = new Schema({
  courseId: {
    type: String,
    required: true,
  },
  courseName: {
    type: String,
  },
  candidates: [CandidateSchema],
});

// User schema
const UserCourseRecordSchema = new Schema(
  {
    userId: {
      type: String,
      required: true,
      unique: true,
    },
    courses: [CourseSchema],
  }
);

export default models.UserCourseRecord ||
  model("UserCourseRecord", UserCourseRecordSchema);
