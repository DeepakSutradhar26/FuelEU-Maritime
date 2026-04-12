import { Request, Response } from 'express';
import { ComplianceRepository } from '../../../outbound/postgres/ComplianceRepository';
import { BankingRepository } from '../../../outbound/postgres/BankingRepository';
import { bankSurplus } from '../../../../core/application/usecases/BankSurplus';
import { applyBanked } from '../../../../core/application/usecases/ApplyBanked';

const complianceRepo = new ComplianceRepository();
const bankingRepo = new BankingRepository();

export const getRecords = async (req: Request, res: Response) => {
  try {
    const { shipId, year } = req.query as { shipId: string; year: string };
    const records = await bankingRepo.findByShipAndYear(shipId, parseInt(year));
    res.json(records);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const bank = async (req: Request, res: Response) => {
  try {
    const { shipId, year } = req.body;
    const result = await bankSurplus(shipId, year, complianceRepo, bankingRepo);
    res.json(result);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

export const apply = async (req: Request, res: Response) => {
  try {
    const { shipId, year, amount } = req.body;
    const result = await applyBanked(shipId, year, amount, complianceRepo, bankingRepo);
    res.json(result);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};