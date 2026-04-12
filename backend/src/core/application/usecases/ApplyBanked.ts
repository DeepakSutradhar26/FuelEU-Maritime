import { IBankingRepository } from '../../ports/outbound/IBankingRepository';
import { IComplianceRepository } from '../../ports/outbound/IComplianceRepository';

export const applyBanked = async (
  shipId: string,
  year: number,
  amount: number,
  complianceRepo: IComplianceRepository,
  bankingRepo: IBankingRepository
) => {
  const cb = await complianceRepo.findByShipAndYear(shipId, year);
  if (!cb) throw new Error('Compliance balance not found');
  if (cb.cbGco2eq >= 0) throw new Error('No deficit to apply banked surplus to');

  const totalBanked = await bankingRepo.getTotalBanked(shipId, year);
  if (amount > totalBanked) throw new Error(`Amount exceeds available banked: ${totalBanked}`);

  await bankingRepo.deductBanked(shipId, year, amount);

  const cbAfter = cb.cbGco2eq + amount;
  await complianceRepo.save({ ...cb, cbGco2eq: cbAfter, surplus: cbAfter > 0 });

  return {
    shipId,
    year,
    cbBefore: cb.cbGco2eq,
    applied: amount,
    cbAfter,
  };
};