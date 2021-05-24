import { Router, Request, Response } from 'express';

const router: Router = Router();

router.get('/', (req: Request, res: Response) => {
  res.send('hello from the auth');
});

export default router;
