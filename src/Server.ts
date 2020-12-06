import express from 'express';
import 'reflect-metadata';
import { container, injectable } from 'tsyringe';
import appConfig from './config';
import ExpressLoader from './loaders/ExpressLoader';
import MongoLoader from './loaders/MongoLoader';
import AuthLoader from './loaders/AuthLoader';

@injectable()
class Server {
  constructor(
    private expressLoader: ExpressLoader,
    private mongoLoader: MongoLoader,
    private authLoader: AuthLoader,
  ) {}

  public async start(): Promise<void> {
    const app = express();

    await this.expressLoader.load(app);
    await this.mongoLoader.load();
    await this.authLoader.load();

    app.listen(appConfig.port, () =>
      console.log(`Listening on port ${appConfig.port}`),
    );
  }
}

container.resolve(Server).start();
