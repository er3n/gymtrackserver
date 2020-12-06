import { NextFunction, Request, Response } from 'express';
import { injectable } from 'tsyringe';
import { UserService } from '../service/UserService';
import { NewUserType } from '../types/UserTypes';
import { Joi } from 'express-validation';

export const signUpValidation = {
  body: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(4).max(32).required(),
    firstName: Joi.string().required().max(32),
    lastName: Joi.string().required().max(32),
  }),
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
      res.sendStatus(201);
    } catch (err) {
      next(err);
    }
  };
}
