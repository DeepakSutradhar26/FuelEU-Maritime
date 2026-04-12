import { computeComparison } from '../../core/application/usecases/ComputeComparison';
import { Route } from '../../core/domain/RouteType';

const baseline: Route = {
  id: 1,
  routeId: 'R001',
  vesselType: 'Container',
  fuelType: 'HFO',
  year: 2024,
  ghgIntensity: 91.0,
  fuelConsumption: 5000,
  distance: 12000,
  totalEmissions: 4500,
  isBaseline: true,
};

const others: Route[] = [
  {
    id: 2,
    routeId: 'R002',
    vesselType: 'BulkCarrier',
    fuelType: 'LNG',
    year: 2024,
    ghgIntensity: 88.0,
    fuelConsumption: 4800,
    distance: 11500,
    totalEmissions: 4200,
    isBaseline: false,
  },
  {
    id: 3,
    routeId: 'R003',
    vesselType: 'Tanker',
    fuelType: 'MGO',
    year: 2024,
    ghgIntensity: 93.5,
    fuelConsumption: 5100,
    distance: 12500,
    totalEmissions: 4700,
    isBaseline: false,
  },
];

describe('ComputeComparison', () => {
  it('should return comparison results for all non-baseline routes', () => {
    const result = computeComparison(baseline, others);
    expect(result).toHaveLength(2);
  });

  it('should correctly calculate percentDiff', () => {
    const result = computeComparison(baseline, others);
    const expected = ((88.0 / 91.0) - 1) * 100;
    expect(result[0]?.percentDiff).toBeCloseTo(expected, 2);
  });

  it('should mark route compliant when ghgIntensity <= 89.3368', () => {
    const result = computeComparison(baseline, others);
    expect(result[0]?.compliant).toBe(true);  // R002 = 88.0
  });

  it('should mark route non-compliant when ghgIntensity > 89.3368', () => {
    const result = computeComparison(baseline, others);
    expect(result[1]?.compliant).toBe(false); // R003 = 93.5
  });
});