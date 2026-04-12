import type { Route, RouteComparisonRow } from '../domain/route.js';
import { TARGET_INTENSITY_GCO2E_PER_MJ } from '../../shared/constants.js';

export function percentDiffGhg(comparison: number, baseline: number): number {
  if (baseline === 0) {
    throw new Error('Baseline GHG intensity cannot be zero');
  }
  return ((comparison / baseline) - 1) * 100;
}

export function isCompliantWithTarget(ghgIntensity: number): boolean {
  return ghgIntensity <= TARGET_INTENSITY_GCO2E_PER_MJ;
}

export function buildRouteComparisons(
  baseline: Route,
  others: Route[],
): RouteComparisonRow[] {
  return others.map((r) => ({
    routeId: r.routeId,
    baselineGhgIntensity: baseline.ghgIntensity,
    comparisonGhgIntensity: r.ghgIntensity,
    percentDiff: percentDiffGhg(r.ghgIntensity, baseline.ghgIntensity),
    compliant: isCompliantWithTarget(r.ghgIntensity),
    targetIntensity: TARGET_INTENSITY_GCO2E_PER_MJ,
  }));
}
