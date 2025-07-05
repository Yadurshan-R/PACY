import mongoose, { Document, Model, Schema } from 'mongoose';


export interface IUser extends Document {
  id: string;
  orgName: string;
  location: string;
  contactNo: string;
  email: string;
  password: string;
  flagFirstLogin: boolean;
  logo: string;  
}


const userSchema = new Schema<IUser>({
  id: { type: String, required: true },
  orgName: { type: String, required: true },
  location: { type: String, required: true, unique: true },
  contactNo: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  flagFirstLogin: { type: Boolean },
  logo: { type: String, required: true }
});


const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>('User', userSchema);

export default User;
