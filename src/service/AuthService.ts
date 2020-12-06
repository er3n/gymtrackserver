import { injectable } from 'tsyringe';
import bcrypt from 'bcryptjs';
import UserModel from '../models/user.model';

export class InvalidUsernameOrPassword extends Error {
  constructor(message?: string) {
    super(message);
    Object.setPrototypeOf(this, new.target.prototype);
    this.name = InvalidUsernameOrPassword.name;
  }
}

@injectable()
export class AuthService {
  login = async (email: string, password: string) => {
    const user = await UserModel.findOne({
      email,
    }).exec();

    if (!user) {
      throw new InvalidUsernameOrPassword('Invalid username!');
    }

    const validate = await user.isValidPassword(password);

    if (!validate) {
      throw new InvalidUsernameOrPassword('Invalid password!');
    }

    return {
      email,
      token: 'todo',
    };
  };
}
