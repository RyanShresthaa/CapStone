const request = require('supertest');
const mongoose = require('mongoose');
require('dotenv').config();

let app;

beforeAll(async () => {
  // Import the app after setting env
  app = require('./server');
  // Optionally connect to test DB
  // await mongoose.connect(process.env.MONGO_URI);
});

describe('Weather API', () => {
  it('should return weather for Kathmandu', async () => {
    const res = await request(app).get('/api/weather?location=Kathmandu');
    expect(res.statusCode).toBe(200);
    expect(res.body.weather).toBeDefined();
    expect(res.body.weather.name).toMatch(/Kathmandu/i);
  });
});

describe('Feedback API', () => {
  it('should accept feedback', async () => {
    const res = await request(app)
      .post('/api/feedback')
      .send({ rating: 5, comment: 'Great app!' });
    expect(res.statusCode).toBe(201);
    expect(res.body.message).toMatch(/submitted/i);
  });
});

describe('Recommendations API', () => {
  it('should require auth', async () => {
    const res = await request(app).get('/api/recommendations');
    expect(res.statusCode).toBe(401);
  });
});

afterAll(async () => {
  // await mongoose.disconnect();
}); 