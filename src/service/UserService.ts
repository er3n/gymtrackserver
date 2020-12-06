import { injectable } from 'tsyringe';
import { APIError, HttpStatusCode } from '../errors/BaseError';
import UserModel, { IUser } from '../models/user.model';
import { NewUserType } from '../types/UserTypes';

export class UsernameAlreadyExistsError extends Error {
  constructor(message?: string) {
    super(message);
    Object.setPrototypeOf(this, new.target.prototype);
    this.name = UsernameAlreadyExistsError.name;
  }
}

@injectable()
export class UserService {
  public isUserExists = async (username: string): Promise<boolean> => {
    const existingUser = await UserModel.findOne({
      email: username,
    }).exec();
    return existingUser !== undefined && existingUser !== null;
  };

  public createUser = async (newUser: NewUserType): Promise<IUser> => {
    const isUserExists = await this.isUserExists(newUser.email);
    if (isUserExists) {
      throw new APIError('UsernameAlreadyInUse', HttpStatusCode.CONFLICT);
    }

    return await UserModel.create({
      ...newUser,
    });
  };
}
