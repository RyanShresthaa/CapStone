const path = require('path');
const request = require('supertest');
const mongoose = require('mongoose');
require('dotenv').config({ path: path.join(__dirname, '.env') });

let app;
let mongoConnected = false;

beforeAll(async () => {
  app = require('./server');
  const uri = (process.env.MONGO_URI || '').trim();
  if (!uri) return;
  try {
    await mongoose.connect(uri, { serverSelectionTimeoutMS: 5000 });
    mongoConnected = true;
  } catch {
    mongoConnected = false;
  }
});

afterAll(async () => {
  if (mongoose.connection.readyState === 1) {
    await mongoose.disconnect();
  }
});

describe('Weather API', () => {
  it('should return weather for Kathmandu', async () => {
    const res = await request(app).get('/api/weather?location=Kathmandu');
    expect(res.statusCode).toBe(200);
    expect(res.body.weather).toBeDefined();
    expect(String(res.body.weather.name)).toMatch(/Kathmandu/i);
  });
});

describe('Feedback API', () => {
  it('should accept feedback', async () => {
    if (!mongoConnected) return;
    const res = await request(app).post('/api/feedback').send({ rating: 5, comment: 'Great app!' });
    expect(res.statusCode).toBe(201);
    expect(res.body.message).toMatch(/submitted/i);
  });
});

describe('Recommendations API', () => {
  it('should return recommendations without auth', async () => {
    if (!mongoConnected) return;
    const res = await request(app).get('/api/recommendations');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body.recommendations)).toBe(true);
  });
});

describe('Auth validation', () => {
  it('should reject invalid email on register', async () => {
    const res = await request(app).post('/register').send({
      firstName: 'A',
      lastName: 'B',
      email: 'not-an-email',
      password: 'secret12',
    });
    expect(res.statusCode).toBe(400);
  });

  it('should reject short password on register', async () => {
    const res = await request(app).post('/register').send({
      firstName: 'A',
      lastName: 'B',
      email: 'valid@example.com',
      password: '12345',
    });
    expect(res.statusCode).toBe(400);
  });
});

describe('Feedback validation', () => {
  it('should reject invalid rating', async () => {
    const res = await request(app).post('/api/feedback').send({ rating: 10, comment: 'x' });
    expect(res.statusCode).toBe(400);
  });
});

describe('Admin trek import', () => {
  it('should return 503 when ADMIN_API_KEY is not set', async () => {
    const prev = process.env.ADMIN_API_KEY;
    delete process.env.ADMIN_API_KEY;
    const res = await request(app)
      .post('/api/admin/treks/import')
      .set('X-Admin-Key', 'any')
      .send({ treks: [] });
    if (prev !== undefined) process.env.ADMIN_API_KEY = prev;
    expect(res.statusCode).toBe(503);
  });
});
