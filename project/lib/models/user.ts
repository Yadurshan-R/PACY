import mongoose, { Document, Model, Schema } from 'mongoose';

// 1️⃣ Define the TypeScript interface for the document
export interface IUser extends Document {
  id: string;
  firstName: string;
  lastName: string;
  phoneNo: string;
  email: string;
  verificationCode: number;
  verificationCodeExpiresAt?: Date;
}

// 2️⃣ Define the schema
const userSchema = new Schema<IUser>({
  id: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  phoneNo: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  verificationCode: { type: Number, default: 0 },
  verificationCodeExpiresAt: { type: Date }
});

// 3️⃣ Export the model with proper typing
const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>('User', userSchema);

export default User;
