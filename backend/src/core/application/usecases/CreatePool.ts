import { IPoolingRepository } from '../../ports/outbound/IPoolingRepository';
import { IComplianceRepository } from '../../ports/outbound/IComplianceRepository';

export interface PoolMemberInput {
  shipId: string;
  year: number;
}

export const createPool = async (
  members: PoolMemberInput[],
  year: number,
  complianceRepo: IComplianceRepository,
  poolingRepo: IPoolingRepository
) => {
  const memberData = await Promise.all(
    members.map(async (m) => {
      const cb = await complianceRepo.findByShipAndYear(m.shipId, m.year);
      if (!cb) throw new Error(`CB not found for ship ${m.shipId}`);
      return { shipId: m.shipId, cbBefore: cb.cbGco2eq };
    })
  );

  const totalCB = memberData.reduce((sum, m) => sum + m.cbBefore, 0);
  if (totalCB < 0) throw new Error('Pool sum must be >= 0');

  // Greedy allocation
  let surplus = memberData
    .filter((m) => m.cbBefore > 0)
    .reduce((sum, m) => sum + m.cbBefore, 0);

  const allocated = memberData.map((m) => {
    if (m.cbBefore >= 0) return { ...m, cbAfter: m.cbBefore };
    const transfer = Math.min(Math.abs(m.cbBefore), surplus);
    surplus -= transfer;
    return { ...m, cbAfter: m.cbBefore + transfer };
  });

  const pool = await poolingRepo.createPool(year);
  await poolingRepo.addMembers(
    allocated.map((m) => ({
      poolId: pool.id,
      shipId: m.shipId,
      cbBefore: m.cbBefore,
      cbAfter: m.cbAfter,
    }))
  );

  return { poolId: pool.id, year, members: allocated };
};