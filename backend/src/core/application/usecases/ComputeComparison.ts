import { Route } from '../../domain/RouteType';

const TARGET_INTENSITY = 89.3368;

export interface ComparisonResult {
  routeId: string;
  vesselType: string;
  fuelType: string;
  year: number;
  baselineGhg: number;
  comparisonGhg: number;
  percentDiff: number;
  compliant: boolean;
}

export const computeComparison = (
  baseline: Route,
  others: Route[]
): ComparisonResult[] => {
  return others.map((route) => {
    const percentDiff =
      ((route.ghgIntensity / baseline.ghgIntensity) - 1) * 100;
    const compliant = route.ghgIntensity <= TARGET_INTENSITY;
    return {
      routeId: route.routeId,
      vesselType: route.vesselType,
      fuelType: route.fuelType,
      year: route.year,
      baselineGhg: baseline.ghgIntensity,
      comparisonGhg: route.ghgIntensity,
      percentDiff: parseFloat(percentDiff.toFixed(4)),
      compliant,
    };
  });
};