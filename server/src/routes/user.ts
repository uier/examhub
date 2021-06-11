import { Express, Router } from 'express';
import isLoggedIn from '../middlewares/authenticate';
import db from '../models';

const router: Router = Router();

router.get('/', isLoggedIn, async (req, res, next) => {
  try {
    const [rows] = await db.user.getAllUsers();
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).json(error);
    next(error);
  }
});

router.get('/me', isLoggedIn, async (req, res, next) => {
  try {
    const { userId } = <Express.User>req.user;
    const [rows] = await db.user.getUserById(userId);
    res.status(200).json(rows[0]);
  } catch (error) {
    res.status(500).json(error);
    next(error);
  }
});

export default router;
