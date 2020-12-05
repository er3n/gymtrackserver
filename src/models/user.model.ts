import { Document, model, Schema } from 'mongoose';

const UserSchema = new Schema({
  firstName: {
    type: String,
    required: true,
    lowercase: true,
  },
  lastName: {
    type: String,
    required: true,
    lowercase: true,
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
});

export interface IUser extends Document {
  firstName: String;
  lastName: String;
  email: String;
  password: String;
}

export default model<IUser>('user', UserSchema);
