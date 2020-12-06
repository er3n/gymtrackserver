import { injectable } from 'tsyringe';
import bcrypt from 'bcryptjs';
import UserModel from '../models/user.model';
import { APIError, HttpStatusCode } from '../errors/BaseError';

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
      throw new APIError('InvalidUsername', HttpStatusCode.BAD_REQUEST);
    }

    const validate = await user.isValidPassword(password);

    if (!validate) {
      throw new APIError('InvalidPassword', HttpStatusCode.BAD_REQUEST);
    }

    return {
      email,
      token: 'todo',
    };
  };
}
