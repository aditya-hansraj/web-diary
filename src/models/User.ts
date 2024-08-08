import mongoose, { Schema, Document } from 'mongoose';
import UserType from '../types/user';

const UserSchema: Schema = new Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  googleId: { type: String }
  },{
    versionKey: false
  }
);

const User = mongoose.model<UserType>('User', UserSchema);

export default User;
