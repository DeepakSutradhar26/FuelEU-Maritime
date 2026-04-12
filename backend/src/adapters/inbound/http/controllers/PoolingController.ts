import { Request, Response } from 'express';
import { ComplianceRepository } from '../../../outbound/postgres/ComplianceRepository';
import { PoolingRepository } from '../../../outbound/postgres/PoolingRepository';
import { createPool } from '../../../../core/application/usecases/CreatePool';

const complianceRepo = new ComplianceRepository();
const poolingRepo = new PoolingRepository();

export const createNewPool = async (req: Request, res: Response) => {
  try {
    const { members, year } = req.body;
    const result = await createPool(members, year, complianceRepo, poolingRepo);
    res.json(result);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};