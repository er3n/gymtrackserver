import express, { Application } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import routes from '../routes';
import expressLoader from './express-loader';

type IniParemeters = {
  expressApp: Application;
};

export default async ({ expressApp: app }: IniParemeters) => {
  await expressLoader({ app });
};
