import 'reflect-metadata';
import { Application } from 'express';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { container } from 'tsyringe';
import Server from '../../Server';
import mongoose from 'mongoose';

class TestSetup {
  public mongod?: MongoMemoryServer;
  public app?: Application;

  public beforeAll = async (): Promise<void> => {
    this.mongod = await MongoMemoryServer.create({
      autoStart: true,
      instance: {
        dbName: 'gymtracktest',
        ip: '127.0.0.1',
        port: 59332,
      },
    });
    this.app = await container.resolve(Server).initialize();
    console.log('bom');
  };

  public afterAll = async (): Promise<void> => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    await this.mongod?.stop();
  };

  public afterEach = async (): Promise<void> => {
    const collections = mongoose.connection.collections;
    for (const key in collections) {
      const collection = collections[key];
      await collection.deleteMany({});
    }
  };
}

const testSetup = new TestSetup();

export default testSetup;
