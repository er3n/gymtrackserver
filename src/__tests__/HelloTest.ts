import { container } from 'tsyringe';
import Server from '../Server';
import request from 'supertest';
import { MongoMemoryServer } from 'mongodb-memory-server';
import DBHanler from './utils/DBHandler';

const dbHandler = new DBHanler();

describe('GET / - a simple api endpoint', () => {
  beforeAll(async () => await dbHandler.startInMemoryDb());

  afterAll(async () => await dbHandler.stopInMemoryDb());

  it('Hello API Request', async () => {
    const mongod = await MongoMemoryServer.create({
      autoStart: true,
      instance: {
        dbName: 'gymtracktest',
        ip: '127.0.0.1',
        port: 59332,
      },
    });

    const server = container.resolve(Server);

    const app = await server.initialize();

    request(app)
      .get('/user')
      .expect('Content-Type', /json/)
      .expect('Content-Length', '15')
      .expect(200)
      .end(function (err, res) {
        if (err) throw err;
      });

    await server.close();

    await mongod.stop();
  });
});
