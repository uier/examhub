import { Express, Router } from 'express';
import { isLoggedIn, isAdmin } from '../middlewares/authenticate';
import db from '../models';

const router: Router = Router();

router.get('/', isLoggedIn, isAdmin, async (req, res, next) => {
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

router.get('/:userId', isLoggedIn, isAdmin, async (req, res, next) => {
  try {
    const { userId } = req.params;
    const [rows] = JSON.parse(JSON.stringify(await db.user.getUserById(Number(userId), true)));
    if (rows.length > 0) {
      res.status(200).json(rows[0]);
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    res.status(500).json(error);
    next(error);
  }
});

router.patch('/:userId', isLoggedIn, async (req, res, next) => {
  try {
    const { userId } = req.params;
    const { name, role } = req.body;
    if (typeof name !== 'string' || typeof role !== 'number') {
      res.status(400).send('Invalid request body, wrong types.');
    } else if (role < 0 || role > 2) {
      res.status(400).send('`role` must be a number in range [0, 2].');
    } else {
      await db.user.modifyUser(Number(userId), name, role);
      res.sendStatus(200);
    }
  } catch (error) {
    res.status(500).json(error);
    next(error);
  }
});

export default router;
