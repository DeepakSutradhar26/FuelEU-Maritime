import request from 'supertest';
import app from '../../infrastructure/server/app';

describe('Compliance API', () => {
  // First set baseline so comparison works
  beforeAll(async () => {
    await request(app).post('/routes/R001/baseline');
  });

  it('GET /compliance/cb - should compute and return CB', async () => {
    const res = await request(app)
      .get('/compliance/cb')
      .query({ shipId: 'R002', year: 2024 });
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('cbGco2eq');
    expect(res.body).toHaveProperty('surplus');
  });

  it('GET /compliance/cb - debug', async () => {
  const res = await request(app)
    .get('/compliance/cb')
    .query({ shipId: 'R002', year: 2024 });
  console.log('BODY:', res.body); // see actual error
  expect(res.status).toBe(200);
});

  it('GET /compliance/adjusted-cb - should return adjusted CB', async () => {
    // First compute CB so it exists
    await request(app)
      .get('/compliance/cb')
      .query({ shipId: 'R002', year: 2024 });

    const res = await request(app)
      .get('/compliance/adjusted-cb')
      .query({ shipId: 'R002', year: 2024 });
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('adjustedCB');
  });
});