import bodyParser from 'body-parser';
import cors from 'cors';
import errorhandler from 'errorhandler';
import express, { Application } from 'express';
import morgan from 'morgan';
import { injectable } from 'tsyringe';
import config from '../config';
import { AuthRoutes } from '../routes/AuthRoutes';
import { UserRoutes } from '../routes/UserRoutes';
import { ErrorHandler } from './ErrorHandler';

@injectable()
class ExpressLoader {
  constructor(
    private errorHandler: ErrorHandler,
    private userRoutes: UserRoutes,
    private authRoutes: AuthRoutes,
  ) {}

  public async load(app: Application) {
    app.use(morgan('dev'));
    app.use(cors());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());

    app.use(express.static(`${__dirname}/public`));

    if (config.isDev) {
      app.use(errorhandler());
    }

    app.use('/api/users', this.userRoutes.routes());
    app.use('/api/auth', this.authRoutes.routes());
    app.use(this.errorHandler.instance);

    return app;
  }
}

export default ExpressLoader;
