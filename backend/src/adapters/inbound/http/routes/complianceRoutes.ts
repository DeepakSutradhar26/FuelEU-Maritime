import { Router } from 'express';
import { getCB, getAdjustedCB } from '../controllers/ComplianceController';

const router = Router();

router.get('/cb', getCB);
router.get('/adjusted-cb', getAdjustedCB);

export default router;