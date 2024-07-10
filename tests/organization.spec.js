// const request = require('supertest');
// const app = require('../app');
// const { sequelize, User, Organisation } = require('../models');
// let token;

// beforeAll(async () => {
//   await sequelize.sync({ force: true });

//   const res = await request(app)
//     .post('/auth/register')
//     .send({
//       firstName: 'John',
//       lastName: 'Doe',
//       email: 'john.doe@example.com',
//       password: 'password123',
//       phone: '1234567890'
//     },20000);

//   token = res.body.data.accessToken;
// });

// afterAll(async () => {
//   await sequelize.close();
// });

// describe('Organisation Endpoints', () => {
//   it('Should create an organisation successfully', async () => {
//     const res = await request(app)
//       .post('/api/organisations')
//       .set('Authorization', `Bearer ${token}`)
//       .send({
//         name: 'New Organisation',
//         description: 'Description of the new organisation'
//       });

//     expect(res.statusCode).toEqual(201);
//     expect(res.body).toHaveProperty('data');
//     expect(res.body.data.name).toEqual('New Organisation');
//   });

//   it('Should get all organisations for the user', async () => {
//     const res = await request(app)
//       .get('/api/organisations')
//       .set('Authorization', `Bearer ${token}`);

//     expect(res.statusCode).toEqual(200);
//     expect(res.body.data.organisations.length).toBeGreaterThan(0);
//   });

//   it('Should get a single organisation by ID', async () => {
//     const orgRes = await request(app)
//       .post('/api/organisations')
//       .set('Authorization', `Bearer ${token}`)
//       .send({
//         name: 'Another Organisation',
//         description: 'Description of another organisation'
//       });

//     const res = await request(app)
//       .get(`/api/organisations/${orgRes.body.data.orgId}`)
//       .set('Authorization', `Bearer ${token}`);

//     expect(res.statusCode).toEqual(200);
//     expect(res.body.data.name).toEqual('Another Organisation');
//   });

//   it('Should add a user to an organisation', async () => {
//     const userRes = await request(app)
//       .post('/auth/register')
//       .send({
//         firstName: 'Jane',
//         lastName: 'Doe',
//         email: 'jane.doe@example.com',
//         password: 'password123',
//         phone: '1234567890'
//       });

//     const orgRes = await request(app)
//       .post('/api/organisations')
//       .set('Authorization', `Bearer ${token}`)
//       .send({
//         name: 'Org for Adding User',
//         description: 'Organisation to add user'
//       });

//     const res = await request(app)
//       .post(`/api/organisations/${orgRes.body.data.orgId}/users`)
//       .set('Authorization', `Bearer ${token}`)
//       .send({
//         userId: userRes.body.data.user.userId
//       });

//     expect(res.statusCode).toEqual(200);
//     expect(res.body.message).toEqual('User added to organisation successfully');
//   });
// });