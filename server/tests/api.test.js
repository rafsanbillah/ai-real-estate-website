import test from 'node:test';
import assert from 'node:assert/strict';
import request from 'supertest';
process.env.NODE_ENV = 'test';
process.env.ADMIN_EMAIL = 'admin@example.com';
process.env.ADMIN_PASSWORD = 'admin123';
process.env.JWT_SECRET = 'test-secret';
const { app } = await import('../server.js');

test('health endpoint returns ok', async () => {
  const res = await request(app).get('/api/health').expect(200);
  assert.equal(res.body.status, 'ok');
  assert.equal(res.body.project, "AI Real Estate Website");
});

test('login succeeds with configured credentials', async () => {
  const res = await request(app).post('/api/auth/login').send({ email: 'admin@example.com', password: 'admin123' }).expect(200);
  assert.ok(res.body.token);
});

test('login rejects invalid credentials', async () => {
  await request(app).post('/api/auth/login').send({ email: 'admin@example.com', password: 'wrong' }).expect(401);
});

test('mock chat returns a reply', async () => {
  const res = await request(app).post('/api/chat').send({ message: 'What services do you offer?' }).expect(200);
  assert.ok(res.body.reply.length > 0);
});
