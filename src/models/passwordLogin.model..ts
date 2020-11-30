import { Document, model, Schema } from 'mongoose';
import { IUser } from './user.model';

export interface IPasswordLogin extends Document {
  password: String;
  user: IUser['_id'];
}

const PasswordLoginSchema = new Schema({
  password: {
    type: String,
    required: true,
    lowercase: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    required: true,
  },
});

export default model<IPasswordLogin>('passwordlogin', PasswordLoginSchema);
