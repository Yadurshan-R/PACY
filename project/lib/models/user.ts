import mongoose, { Document, Model, Schema } from 'mongoose';

export interface IUser extends Document {
  id: string;
  firstName: string;
  lastName: string;
  phoneNo: string;
  email: string;
  password: string;                 // <-- add this
  verificationCode: number;
  verificationCodeExpiresAt?: Date;
}

const userSchema = new Schema<IUser>({
  id: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  phoneNo: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },   // <-- add this
  verificationCode: { type: Number, default: 0 },  // keep this if needed separately
  verificationCodeExpiresAt: { type: Date }
});


// 3️⃣ Export the model with proper typing
const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>('User', userSchema);

export default User;
