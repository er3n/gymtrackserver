import request from 'supertest';
import testSetup from './utils/testSetup';

describe('GET / - a simple api endpoint', () => {
  beforeAll(async () => await testSetup.beforeAll());
  afterAll(async () => await testSetup.afterAll());
  afterEach(async () => await testSetup.afterEach());

  it('echo test', async () => {
    request(testSetup.app)
      .get('/user')
      .expect('Content-Type', /json/)
      .expect('Content-Length', '15')
      .expect(200)
      .end(function (err, res) {
        if (err) throw err;
      });
  });
});
