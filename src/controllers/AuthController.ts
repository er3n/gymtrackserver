import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import passport from 'passport';
import { injectable } from 'tsyringe';
import config from '../config';

@injectable()
export class AuthController {
  public login = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    passport.authenticate('login', async (err, user, info) => {
      try {
        if (err || !user) {
          console.log(info);
          const error = new Error(info?.message || 'An error occurred.');

          return next(error);
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
