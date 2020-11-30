import { Document, Model, model, Types, Schema, Query } from 'mongoose';

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
});

export interface IUser extends Document {
  firstName: String;
  lastName: String;
  email: String;
}

export default model<IUser>('user', UserSchema);
