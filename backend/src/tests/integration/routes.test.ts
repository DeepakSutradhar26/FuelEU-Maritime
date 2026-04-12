import request from 'supertest';
import app from '../../infrastructure/server/app';

describe('Routes API', () => {
  it('GET /routes - should return all routes', async () => {
    const res = await request(app).get('/routes');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it('POST /routes/:id/baseline - should set baseline', async () => {
    const res = await request(app).post('/routes/R001/baseline');
    expect(res.status).toBe(200);
    expect(res.body.message).toContain('R001');
  });

  it('GET /routes/comparison - should return comparison data', async () => {
    const res = await request(app).get('/routes/comparison');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});