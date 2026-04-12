import { Request, Response } from 'express';
import { RouteRepository } from '../../../outbound/postgres/RouteRepository';
import { computeComparison } from '../../../../core/application/usecases/ComputeComparison';

const repo = new RouteRepository();

export const getAllRoutes = async (req: Request, res: Response) => {
  try {
    const routes = await repo.findAll();
    res.json(routes);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const setBaseline = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    await repo.setBaseline(id);
    res.json({ message: `Baseline set to route ${id}` });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const getComparison = async (req: Request, res: Response) => {
  try {
    const baseline = await repo.findBaseline();
    if (!baseline) return res.status(404).json({ error: 'No baseline set' });
    const all = await repo.findAll();
    const others = all.filter((r) => r.routeId !== baseline.routeId);
    const result = computeComparison(baseline, others);
    res.json(result);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};