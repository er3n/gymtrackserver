import { injectable } from 'tsyringe';
import config from '../config';
import mongoose, { Connection } from 'mongoose';

@injectable()
class MongoLoader {
  private connection?: Connection;

  public async load() {
    const isProduction = config.enviroment === 'production';

    if (!isProduction) {
      mongoose.set('debug', true);
    }

    if (!config.mongodb_uri) {
      throw new Error('Can not find mongudb_uri!');
    }

    const connection = mongoose.connection;

    connection.on('connected', () => {
      console.log('Mongo Connection Established');
    });

    connection.on('reconnected', () => {
      console.log('Mongo Connection Reestablished');
    });

    connection.on('disconnected', () => {
      console.log('Mongo Connection Disconnected');
      console.log('Trying to reconnect Mongo ...');
    });

    connection.on('error', console.error);

    await mongoose.connect(config.mongodb_uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      keepAlive: true,
    });

    this.connection = connection;
  }

  public async close() {
    await this.connection?.close();
    console.log('Mongo Connection Closed');
  }
}

export default MongoLoader;
