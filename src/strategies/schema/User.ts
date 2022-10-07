import { Schema, model, Document } from 'mongoose';

interface UserInterface extends Document {
  email: string;
  username: string;
  password: string;
  last_name?: string;
  first_name?: string;
  is_active?: boolean;
}

const UserSchema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    last_name: { type: String },
    first_name: { type: String },
    is_active: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default model<UserInterface>('User', UserSchema);
