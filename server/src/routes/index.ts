import { Router } from 'express';
import AuthRoutes from './auth';

const router: Router = Router();

router.use('/auth', AuthRoutes);

export default router;
