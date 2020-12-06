import { MongoMemoryServer } from 'mongodb-memory-server';

export default class DBHanler {
  private mongod?: MongoMemoryServer;

  public startInMemoryDb = async () => {
    this.mongod = await MongoMemoryServer.create({
      autoStart: true,
      instance: {
        dbName: 'gymtracktest',
        ip: '127.0.0.1',
        port: 59332,
      },
    });
  };
}
