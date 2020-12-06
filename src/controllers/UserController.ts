import { NextFunction, Request, Response } from 'express';
import { injectable } from 'tsyringe';
import {
  UsernameAlreadyExistsError,
  UserService,
} from '../service/UserService';

type NewUserType = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

@injectable()
export class UserController {
  constructor(private userService: UserService) {}

  public signUp = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    const newUser = req.body as NewUserType;

    try {
      await this.userService.createUser(newUser);
    } catch (err) {
      if (err instanceof UsernameAlreadyExistsError) {
        res.sendStatus(409);
      } else {
        next(err);
      }
    }

    res.sendStatus(201);
  };
}
