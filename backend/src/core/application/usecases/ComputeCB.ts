const TARGET_INTENSITY = 89.3368;
const ENERGY_FACTOR = 41000;

export interface CBInput {
  shipId: string;
  year: number;
  ghgIntensity: number;
  fuelConsumption: number;
}

export interface CBResult {
  shipId: string;
  year: number;
  cbGco2eq: number;
  surplus: boolean;
}

export const computeCB = (input: CBInput): CBResult => {
  const energyInScope = input.fuelConsumption * ENERGY_FACTOR;
  const cbGco2eq = (TARGET_INTENSITY - input.ghgIntensity) * energyInScope;
  return {
    shipId: input.shipId,
    year: input.year,
    cbGco2eq: parseFloat(cbGco2eq.toFixed(4)),
    surplus: cbGco2eq > 0,
  };
};