import { Router } from 'express';
import { validate } from 'express-validation';
import { injectable } from 'tsyringe';
import {
  signUpValidation,
  UserController,
} from '../controllers/UserController';

@injectable()
export class UserRoutes {
  constructor(private userController: UserController) {}

  public routes() {
    const router: Router = Router();

    router.post(
      '/signup',
      validate(signUpValidation, {}, {}),
      this.userController.signUp,
    );

    return router;
  }
}
