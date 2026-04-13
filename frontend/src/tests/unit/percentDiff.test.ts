import { describe, it, expect } from 'vitest';

const computePercentDiff = (comparison: number, baseline: number): number => {
  return parseFloat((((comparison / baseline) - 1) * 100).toFixed(4));
};

const TARGET_INTENSITY = 89.3368;
const isCompliant = (ghgIntensity: number): boolean => ghgIntensity <= TARGET_INTENSITY;

describe('computePercentDiff', () => {
  it('should return negative diff when comparison is lower than baseline', () => {
    const result = computePercentDiff(88.0, 91.0);
    expect(result).toBeLessThan(0);
  });

  it('should return positive diff when comparison is higher than baseline', () => {
    const result = computePercentDiff(93.5, 91.0);
    expect(result).toBeGreaterThan(0);
  });

  it('should return 0 when comparison equals baseline', () => {
    const result = computePercentDiff(91.0, 91.0);
    expect(result).toBe(0);
  });
});

describe('isCompliant', () => {
  it('should return true when ghgIntensity is below target', () => {
    expect(isCompliant(88.0)).toBe(true);
  });

  it('should return false when ghgIntensity is above target', () => {
    expect(isCompliant(93.5)).toBe(false);
  });

  it('should return true when ghgIntensity equals target', () => {
    expect(isCompliant(89.3368)).toBe(true);
  });
});