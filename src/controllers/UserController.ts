import { Request, Response } from 'express';
import { injectable } from 'tsyringe';
import User from '../models/user.model';

type NewUserType = {
  firstName: String;
  lastName: String;
  email: String;
  password: String;
};

@injectable()
export class UserController {
  public async getUser(req: Request, res: Response): Promise<void> {
    res.json({ text: 'hello' });
  }

  public async createUser(req: Request, res: Response): Promise<void> {
    const newUser = req.body as NewUserType;

    const existingUser = await User.findOne({
      email: newUser.email,
    }).exec();

    if (existingUser) {
      res.sendStatus(409);
      return;
    }

    await User.create({
      ...newUser,
    });

    res.sendStatus(201);
  }
}
