import { Request, Response } from 'express';
import { RouteRepository } from '../../../outbound/postgres/RouteRepository';
import { ComplianceRepository } from '../../../outbound/postgres/ComplianceRepository';
import { BankingRepository } from '../../../outbound/postgres/BankingRepository';
import { computeCB } from '../../../../core/application/usecases/ComputeCB';

const routeRepo = new RouteRepository();
const complianceRepo = new ComplianceRepository();
const bankingRepo = new BankingRepository();

export const getCB = async (req: Request, res: Response) => {
  try {
    const { shipId, year } = req.query as { shipId: string; year: string };
    const route = await routeRepo.findById(shipId);
    if (!route) return res.status(404).json({ error: 'Route not found' });

    const result = computeCB({
      shipId,
      year: parseInt(year),
      ghgIntensity: route.ghgIntensity,
      fuelConsumption: route.fuelConsumption,
    });

    const saved = await complianceRepo.save(result);
    res.json(saved);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const getAdjustedCB = async (req: Request, res: Response) => {
  try {
    const { shipId, year } = req.query as { shipId: string; year: string };
    const cb = await complianceRepo.findByShipAndYear(shipId, parseInt(year));
    if (!cb) return res.status(404).json({ error: 'CB not found' });

    const totalBanked = await bankingRepo.getTotalBanked(shipId, parseInt(year));
    const adjustedCB = cb.cbGco2eq + totalBanked;

    res.json({ shipId, year: parseInt(year), cbGco2eq: cb.cbGco2eq, banked: totalBanked, adjustedCB });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};