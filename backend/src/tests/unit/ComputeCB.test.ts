import { computeCB } from '../../core/application/usecases/ComputeCB';

describe('ComputeCB', () => {
  it('should return surplus when ghgIntensity is below target', () => {
    const result = computeCB({
      shipId: 'R002',
      year: 2024,
      ghgIntensity: 88.0,
      fuelConsumption: 4800,
    });
    expect(result.cbGco2eq).toBeGreaterThan(0);
    expect(result.surplus).toBe(true);
  });

  it('should return deficit when ghgIntensity is above target', () => {
    const result = computeCB({
      shipId: 'R003',
      year: 2024,
      ghgIntensity: 93.5,
      fuelConsumption: 5100,
    });
    expect(result.cbGco2eq).toBeLessThan(0);
    expect(result.surplus).toBe(false);
  });

  it('should return zero CB when ghgIntensity equals target', () => {
    const result = computeCB({
      shipId: 'R001',
      year: 2024,
      ghgIntensity: 89.3368,
      fuelConsumption: 5000,
    });
    expect(result.cbGco2eq).toBe(0);
  });

  it('should correctly calculate CB value', () => {
    const result = computeCB({
      shipId: 'R002',
      year: 2024,
      ghgIntensity: 88.0,
      fuelConsumption: 4800,
    });
    // (89.3368 - 88.0) * (4800 * 41000)
    const expected = (89.3368 - 88.0) * (4800 * 41000);
    expect(result.cbGco2eq).toBeCloseTo(expected, 2);
  });
});