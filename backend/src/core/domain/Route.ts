export type Route = {
  id: number;
  routeId: string;
  vesselType: string;
  fuelType: string;
  year: number;
  ghgIntensity: number;
  fuelConsumption: number;
  distance: number;
  totalEmissions: number;
  isBaseline: boolean;
  shipId: string;
};

export type RouteComparisonRow = {
  routeId: string;
  baselineGhgIntensity: number;
  comparisonGhgIntensity: number;
  percentDiff: number;
  compliant: boolean;
  targetIntensity: number;
};
