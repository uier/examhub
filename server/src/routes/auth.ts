import { Router } from 'express';
import dayjs from 'dayjs';
import { db } from '../models';
import hash from '../utils/hash';

const router: Router = Router();

router.get('/', async (req, res, next) => {
  try {
    const [rows] = await db.auth.getAllUsers();
    res.json(rows);
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const {
      name, email, password,
    } = req.body;
    const newUser = {
      name,
      email,
      create_time: dayjs().format(),
      password: hash(process.env.SECRET, password),
    };
    await db.auth.addNewUser(newUser);
    res.status(200).send('Success.');
  } catch (error) {
    next(error);
  }
});

export default router;
