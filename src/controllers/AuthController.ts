import { NextFunction, Request, Response } from 'express';
import { Joi, schema } from 'express-validation';
import jwt from 'jsonwebtoken';
import passport from 'passport';
import { injectable } from 'tsyringe';
import config from '../config';

export const loginValidation = {
  body: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(4).max(32).required(),
  }),
} as schema;

@injectable()
export class AuthController {
  public login = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    passport.authenticate('login', async (err, user, info) => {
      try {
        if (err) {
          return next(err);
        }

        req.login(user, { session: false }, async (error) => {
          if (error) return next(error);
          const body = { email: user.email };
          const token = jwt.sign({ user: body }, config.jwtSecret);
          return res.json({ token });
        });
      } catch (err) {
        next(err);
      }
    })(req, res, next);
  };

  public getUser = async (req: Request, res: Response) => {
    res.json({
      user: req.user,
    });
  };
}
