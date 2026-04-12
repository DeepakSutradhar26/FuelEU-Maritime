import { MJ_PER_TONNE_FUEL, TARGET_INTENSITY_GCO2E_PER_MJ } from '../../shared/constants.js';

/**
 * Compliance balance in gCO₂e (equivalent).
 * Positive = surplus vs target; negative = deficit.
 */
export function computeComplianceBalanceGco2e(
  ghgIntensityGco2ePerMj: number,
  fuelConsumptionTonnes: number,
  targetIntensity: number = TARGET_INTENSITY_GCO2E_PER_MJ,
): number {
  const energyMj = fuelConsumptionTonnes * MJ_PER_TONNE_FUEL;
  return (targetIntensity - ghgIntensityGco2ePerMj) * energyMj;
}
