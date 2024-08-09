import { Document, Types } from 'mongoose';

export default interface UserType extends Document {
  _id: Types.ObjectId | string
  username: string;
  email: string;
  password: string;
  googleId?: string;
}
