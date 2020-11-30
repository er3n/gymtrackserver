import dotenv from 'dotenv';

let path = '.env.dev';
if (process.env.NODE_ENV) {
  path = `.env.${process.env.NODE_ENV}`;
}

dotenv.config({ path });

export default {
  port: process.env.PORT,
  enviroment: process.env.NODE_ENV,
  mongodb_uri: process.env.MONGODB_URI,
};
