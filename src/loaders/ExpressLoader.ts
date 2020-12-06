import { container, injectable, singleton } from 'tsyringe';
import express, { Application } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { UserRoutes } from '../routes/UserRoutes';
import { AuthRoutes } from '../routes/AuthRoutes';

@injectable()
class ExpressLoader {
  constructor(private userRoutes: UserRoutes, private authRoutes: AuthRoutes) {}

  public async load(app: Application) {
    app.use(cors());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());

    app.use(express.static(`${__dirname}/public`));

    app.use('/api/users', this.userRoutes.routes());
    app.use('/api/auth', this.authRoutes.routes());

    return app;
  }
}

export default ExpressLoader;
