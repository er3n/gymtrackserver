import express, { Application } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import routes from '../routes';

export default async ({ app }: { app: Application }) => {
  app.use(cors());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());

  app.use(express.static(`${__dirname}/public`));

  app.use('/', routes);

  return app;
};
