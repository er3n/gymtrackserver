import dotenv from 'dotenv';

let path = '.env.dev';
if (process.env.NODE_ENV) {
  path = `.env.${process.env.NODE_ENV}`;
}

dotenv.config({ path });

const jwtSecret = process.env.JWT_SECRET;
if (!jwtSecret) {
  throw new Error('Missing JWT_SECRET');
}

export default {
  port: process.env.PORT,
  enviroment: process.env.NODE_ENV,
  mongodb_uri: process.env.MONGODB_URI,
  jwtSecret: process.env.JWT_SECRET || '',
};
