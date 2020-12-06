import express, { Application } from 'express';
import 'reflect-metadata';
import { injectable } from 'tsyringe';
import appConfig from './config';
import ExpressLoader from './loaders/ExpressLoader';
import MongoLoader from './loaders/MongoLoader';
import AuthLoader from './loaders/AuthLoader';

@injectable()
export default class Server {
  constructor(
    private expressLoader: ExpressLoader,
    private mongoLoader: MongoLoader,
    private authLoader: AuthLoader,
  ) {}

  public async initialize(): Promise<Application> {
    const app = express();

    app.get('/user', function (req, res) {
      res.status(200).json({ name: 'john' });
    });

    await this.expressLoader.load(app);
    await this.mongoLoader.load();
    await this.authLoader.load();

    return app;
  }

  public async close(): Promise<void> {
    await this.mongoLoader.close();
  }
}
