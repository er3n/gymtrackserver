import { container, injectable, singleton } from 'tsyringe';
import express, { Application } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { UserRoutes } from '../routes/UserRoutes';

@injectable()
class ExpressLoader {
  constructor(private userRoutes: UserRoutes) {}

  public async load(app: Application) {
    app.use(cors());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());

    app.use(express.static(`${__dirname}/public`));

    app.use('/api/users', this.userRoutes.routes());

    return app;
  }
}

export default ExpressLoader;
