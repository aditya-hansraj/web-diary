import { Document } from 'mongoose';

export default interface UserType extends Document {
  username: string;
  email: string;
  password: string;
  googleId?: string;
}
