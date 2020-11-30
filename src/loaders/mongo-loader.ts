import mongoose from 'mongoose';
import config from '../config';

export default async () => {
  const isProduction = config.enviroment === 'production';

  console.log('ses');

  if (!isProduction) {
    mongoose.set('debug', true);
  }

  if (!config.mongodb_uri) {
    throw new Error('Can not find mongudb_uri!');
  }

  console.log('ses');

  const db = await mongoose.connect(config.mongodb_uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  db.connection.on('error', console.error);
};
