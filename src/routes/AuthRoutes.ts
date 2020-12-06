import { Router } from 'express';
import passport from 'passport';
import { injectable } from 'tsyringe';
import { AuthController } from '../controllers/AuthController';

@injectable()
export class AuthRoutes {
  constructor(private authController: AuthController) {}

  public routes() {
    const router: Router = Router();

    router.post('/login', this.authController.login);
    router.get(
      '/',
      passport.authenticate('jwt', { session: false }),
      this.authController.getUser,
    );

    return router;
  }
}
