import dotenv from 'dotenv';

const isDev = process.env.NODE_ENV == 'dev';

let path = `.env.${process.env.NODE_ENV}`;
if (isDev) {
  path = '.env.dev';
}

dotenv.config({ path });

const jwtSecret = process.env.JWT_SECRET;
if (!jwtSecret) {
  throw new Error('Missing JWT_SECRET');
}

export default {
  isDev,
  port: process.env.PORT,
  enviroment: process.env.NODE_ENV,
  mongodb_uri: process.env.MONGODB_URI,
  jwtSecret: process.env.JWT_SECRET || '',
};
