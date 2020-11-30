import { Application } from 'express';
import expressLoader from './express-loader';
import mongoLoader from './mongo-loader';

type IniParemeters = {
  expressApp: Application;
};

export default async ({ expressApp: app }: IniParemeters) => {
  await expressLoader({ app });
  await mongoLoader();
};
