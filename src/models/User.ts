import { Schema, model, Document } from 'mongoose';
import UserType from '../types/user';

const UserSchema = new Schema<UserType>({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  googleId: { type: String, unique: true, sparse: true },
});

const User = model<UserType>('User', UserSchema);

export default User;
