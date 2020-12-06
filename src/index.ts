import 'reflect-metadata';
import { container } from 'tsyringe';
import config from './config';
import Server from './Server';

container
  .resolve(Server)
  .initialize()
  .then((app) => {
    app.listen(config.port, () =>
      console.log(`Listening on port ${config.port}`),
    );
  });
