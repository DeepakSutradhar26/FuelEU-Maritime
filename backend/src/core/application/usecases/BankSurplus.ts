import { IBankingRepository } from '../../ports/outbound/IBankingRepository';
import { IComplianceRepository } from '../../ports/outbound/IComplianceRepository';

export const bankSurplus = async (
  shipId: string,
  year: number,
  complianceRepo: IComplianceRepository,
  bankingRepo: IBankingRepository
) => {
  const cb = await complianceRepo.findByShipAndYear(shipId, year);
  if (!cb) throw new Error('Compliance balance not found');
  if (cb.cbGco2eq <= 0) throw new Error('No surplus to bank');

  const entry = await bankingRepo.save({
    id: 0,
    shipId,
    year,
    amountGco2eq: cb.cbGco2eq,
    createdAt: new Date(),
  });

  return entry;
};