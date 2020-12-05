import express from 'express';
import 'reflect-metadata';
import { container, injectable } from 'tsyringe';
import appConfig from './config';
import ExpressLoader from './loaders/ExpressLoader';
import MongoLoader from './loaders/MongoLoader';

@injectable()
class Server {
  constructor(
    private expressLoader: ExpressLoader,
    private mongoLoader: MongoLoader,
  ) {}

  public async start(): Promise<void> {
    const app = express();

    await this.expressLoader.load(app);
    await this.mongoLoader.load();

    app.listen(appConfig.port, () =>
      console.log(`Listening on port ${appConfig.port}`),
    );
  }
}

container.resolve(Server).start();
