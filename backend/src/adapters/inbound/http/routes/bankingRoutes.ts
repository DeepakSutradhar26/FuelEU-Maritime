import { Router } from 'express';
import { getRecords, bank, apply } from '../controllers/BankingController';

const router = Router();

router.get('/records', getRecords);
router.post('/bank', bank);
router.post('/apply', apply);

export default router;