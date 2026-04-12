import request from 'supertest';
import app from '../../infrastructure/server/app';

describe('Pooling API', () => {
  beforeAll(async () => {
    // Compute CB for all ships
    await request(app).get('/compliance/cb').query({ shipId: 'R001', year: 2024 });
    await request(app).get('/compliance/cb').query({ shipId: 'R002', year: 2024 });
    await request(app).get('/compliance/cb').query({ shipId: 'R003', year: 2024 });
    await request(app).get('/compliance/cb').query({ shipId: 'R004', year: 2025 });
    await request(app).get('/compliance/cb').query({ shipId: 'R005', year: 2025 });
  });

  it('POST /pools - should create pool successfully with surplus ships', async () => {
    // R002 (88.0) and R004 (89.2) are both below target 89.3368 → both surplus
    const res = await request(app)
      .post('/pools')
      .send({
        year: 2024,
        members: [
          { shipId: 'R002', year: 2024 },
          { shipId: 'R004', year: 2025 },
        ],
      });
    console.log('POOL BODY:', res.body);
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('poolId');
    expect(res.body.members).toHaveLength(2);
  });

  it('POST /pools - should fail if pool sum is negative', async () => {
    // R003 alone is deficit → sum < 0
    const res = await request(app)
      .post('/pools')
      .send({
        year: 2024,
        members: [
          { shipId: 'R003', year: 2024 },
        ],
      });
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty('error');
  });
});