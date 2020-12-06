import { injectable } from 'tsyringe';
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
    console.log(username);
    const existingUser = await UserModel.findOne({
      email: username,
    }).exec();
    console.log(existingUser);
    return existingUser !== undefined && existingUser !== null;
  };

  public createUser = async (newUser: NewUserType): Promise<IUser> => {
    const isUserExists = await this.isUserExists(newUser.email);
    console.log(isUserExists);
    if (isUserExists) {
      throw new UsernameAlreadyExistsError('Username already in use');
    }

    return await UserModel.create({
      ...newUser,
    });
  };
}
