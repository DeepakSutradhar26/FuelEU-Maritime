import { Router } from 'express';
import { createNewPool } from '../controllers/PoolingController';

const router = Router();

router.post('/', createNewPool);

export default router;