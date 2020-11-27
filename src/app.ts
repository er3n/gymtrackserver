import express, { Application } from 'express';
import { start } from 'repl';
import config from './config';
import loaders from './loaders';

const app: Application = express();

async function startServer() {
  const app: Application = express();

  await loaders({ expressApp: app });

  app.listen(config.port, () =>
    console.log(`Listening on port ${config.port}`),
  );
}

startServer();
