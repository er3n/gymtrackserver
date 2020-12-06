import { Router } from 'express';
import { validate } from 'express-validation';
import passport from 'passport';
import { injectable } from 'tsyringe';
import { AuthController, loginValidation } from '../controllers/AuthController';

@injectable()
export class AuthRoutes {
  constructor(private authController: AuthController) {}

  public routes() {
    const router: Router = Router();

    router.post(
      '/login',
      validate(loginValidation, {}, {}),
      this.authController.login,
    );
    router.get(
      '/',
      passport.authenticate('jwt', { session: false }),
      this.authController.getUser,
    );

    return router;
  }
}
