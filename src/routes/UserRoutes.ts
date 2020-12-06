import { Router } from 'express';
import { injectable } from 'tsyringe';
import { UserController } from '../controllers/UserController';

@injectable()
export class UserRoutes {
  constructor(private userController: UserController) {}

  public routes() {
    const router: Router = Router();

    router.post('/signup', this.userController.signUp);

    return router;
  }
}
