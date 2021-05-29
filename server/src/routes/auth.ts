import { Router } from 'express';
import dayjs from 'dayjs';
import { db } from '../models';
import hash from '../utils/hash';

const router: Router = Router();

router.get('/', (req, res, next) => {
  db.auth.getAllUsers()
    .then((results) => res.json(results))
    .catch(next);
});

router.post('/', (req, res, next) => {
  const {
    userId, name, email, password,
  } = req.body;
  const newUser = {
    user_id: hash(process.env.SECRET, userId),
    name,
    email,
    create_time: dayjs().format(),
    password: hash(process.env.SECRET, password),
  };
  db.auth.addNewUser(newUser)
    .then(() => res.status(200).send('Success.'))
    .catch(next);
});

export default router;
