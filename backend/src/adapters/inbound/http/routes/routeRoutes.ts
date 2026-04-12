import { Router } from 'express';
import { getAllRoutes, setBaseline, getComparison } from '../controllers/RouteController';

const router = Router();

router.get('/', getAllRoutes);
router.post('/:id/baseline', setBaseline);
router.get('/comparison', getComparison);

export default router;