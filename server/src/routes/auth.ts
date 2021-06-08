import { Router } from 'express';
import dayjs from 'dayjs';
import db from '../models';
import hash from '../utils/hash';

const router: Router = Router();

router.post('/', async (req, res, next) => {
  try {
    const {
      name, email, password,
    } = req.body;
    const newUser = {
      name,
      email,
      createTime: dayjs().format(),
      password: hash(process.env.SECRET, password),
    };
    await db.auth.signUpNewUser(newUser);
    res.status(200).send('Success.');
  } catch (error) {
    res.status(500).send(error);
    next(error);
  }
});

export default router;
