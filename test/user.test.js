const request = require('supertest');
const app = require('../app');

describe('User Endpoints', () => {
  it('should create a new user', async () => {
    const res = await request(app)
      .post('/users')
      .send({
        firstName: 'Test',
        lastName: 'User',
        email: 'test@user.com',
        password: 'test123'
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body.data).toHaveProperty('email', 'test@user.com');
  });
});
