import { describe, it, expect } from 'vitest';

const TARGET_INTENSITY = 89.3368;
const ENERGY_FACTOR = 41000;

const computeCB = (ghgIntensity: number, fuelConsumption: number) => {
  const energyInScope = fuelConsumption * ENERGY_FACTOR;
  const cbGco2eq = (TARGET_INTENSITY - ghgIntensity) * energyInScope;
  return {
    cbGco2eq: parseFloat(cbGco2eq.toFixed(4)),
    surplus: cbGco2eq > 0,
  };
};

describe('computeCB (frontend utility)', () => {
  it('should return surplus when ghgIntensity is below target', () => {
    const result = computeCB(88.0, 4800);
    expect(result.surplus).toBe(true);
    expect(result.cbGco2eq).toBeGreaterThan(0);
  });

  it('should return deficit when ghgIntensity is above target', () => {
    const result = computeCB(93.5, 5100);
    expect(result.surplus).toBe(false);
    expect(result.cbGco2eq).toBeLessThan(0);
  });

  it('should return zero CB when ghgIntensity equals target', () => {
    const result = computeCB(89.3368, 5000);
    expect(result.cbGco2eq).toBe(0);
  });
});