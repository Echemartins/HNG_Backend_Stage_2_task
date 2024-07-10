const request = require('supertest');
const app = require('../app');
const { sequelize } = require('../models');

beforeAll(async () => {
  await sequelize.sync({ force: true });
},20000);

afterAll(async () => {
  await sequelize.close();
});

describe('Auth Endpoints', () => {
  it('Should register user successfully with default organisation', async () => {
    const res = await request(app)
      .post('/auth/register')
      .send({
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        password: 'password123',
        phone: '1234567890'
      });

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('data');
    expect(res.body.data.user).toHaveProperty('userId');
    expect(res.body.data.user.firstName).toEqual('John');
    expect(res.body.data.user.lastName).toEqual('Doe');
    expect(res.body.data.user.email).toEqual('john.doe@example.com');
  });

  it('Should fail if required fields are missing', async () => {
    const res = await request(app)
      .post('/auth/register')
      .send({
        firstName: 'John',
        lastName: '',
        email: 'john.doe@example.com',
        password: 'password123',
        phone: '1234567890'
      });

    expect(res.statusCode).toEqual(401);
    expect(res.body).toHaveProperty('errors');
    expect(res.body.errors[0].field).toEqual('lastName');
  });
  // it('Should log the user in successfully', async () => {
  //   await request(app)
  //     .post('/auth/register')
  //     .send({
  //       firstName: 'John',
  //       lastName: 'Doe',
  //       email: 'john.doe@example.com',
  //       password: 'password123',
  //       phone: '1234567890'
  //     });
  //     const res = await request(app)
  //     .post('/auth/login')
  //     .send({
  //       email: 'john.doe@example.com',
  //       password: 'password123'
  //     });

  //   expect(res.statusCode).toEqual(200);
  //   expect(res.body).toHaveProperty('data');
  //   expect(res.body.data).toHaveProperty('accessToken');
  // });

  // it('Should fail if required fields are missing during login', async () => {
  //   const res = await request(app)
  //     .post('/auth/login')
  //     .send({
  //       email: 'john.doe@example.com'
  //     });

  //   expect(res.statusCode).toEqual(422);
  // });

  // it('Should fail if email is duplicate', async () => {
  //   await request(app)
  //     .post('/auth/register')
  //     .send({
  //       firstName: 'Jane',
  //       lastName: 'Doe',
  //       email: 'jane.doe@example.com',
  //       password: 'password123',
  //       phone: '1234567890'
  //     });

  //   const res = await request(app)
  //     .post('/auth/register')
  //     .send({
  //       firstName: 'Jane',
  //       lastName: 'Doe',
  //       email: 'jane.doe@example.com',
  //       password: 'password123',
  //       phone: '1234567890'
  //     });

  //   expect(res.statusCode).toEqual(422);
  //   expect(res.body).toHaveProperty('errors');
  //   expect(res.body.errors[0].field).toEqual('email');
  // });
});