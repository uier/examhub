import { Router } from 'express';
import dayjs from 'dayjs';
import { pool } from '../models';
import hash from '../utils/hash';

const router: Router = Router();

router.get('/', (req, res) => {
  pool.query('SELECT * FROM user', (error, results) => {
    if (error) {
      res.sendStatus(500);
      throw error;
    }
    res.json(results);
  });
});

router.post('/', (req, res) => {
  const newUser = {
    user_id: hash.hash(process.env.SECRET, req.body.userId),
    name: pool.escape(req.body.name),
    email: pool.escape(req.body.email),
    role: 2,
    contribution: 0,
    create_time: dayjs().format(),
    password: hash.hash(process.env.SECRET, req.body.password),
  };
  pool.query('INSERT INTO user SET ?', newUser, (error) => {
    if (error) {
      res.sendStatus(500);
      throw error;
    }
    res.status(200).send('Success.');
  });
});

export default router;
