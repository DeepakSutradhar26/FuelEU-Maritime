import request from 'supertest';
import app from '../../infrastructure/server/app';

describe('Banking API', () => {
  beforeAll(async () => {
    // Compute CB for R002 (surplus) and R003 (deficit) first
    await request(app).get('/compliance/cb').query({ shipId: 'R002', year: 2024 });
    await request(app).get('/compliance/cb').query({ shipId: 'R003', year: 2024 });
  });

  it('POST /banking/bank - should bank surplus', async () => {
    const res = await request(app)
      .post('/banking/bank')
      .send({ shipId: 'R002', year: 2024 });
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('amountGco2eq');
  });

  it('POST /banking/bank - should fail if no surplus', async () => {
    const res = await request(app)
      .post('/banking/bank')
      .send({ shipId: 'R003', year: 2024 });
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty('error');
  });

  it('POST /banking/apply - should fail if over-apply', async () => {
    // First compute CB for R003 (deficit ship)
    await request(app).get('/compliance/cb').query({ shipId: 'R003', year: 2024 });

    const res = await request(app)
      .post('/banking/apply')
      .send({ shipId: 'R003', year: 2024, amount: 999999999 });
    expect(res.status).toBe(400);
    expect(res.body.error).toContain('exceeds');
  });

  it('GET /banking/records - should return records', async () => {
    const res = await request(app)
      .get('/banking/records')
      .query({ shipId: 'R002', year: 2024 });
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});