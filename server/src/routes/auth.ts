import { Router } from 'express';
import dayjs from 'dayjs';
import passport from 'passport';
import isLoggedIn from '../middlewares/authenticate';
import db from '../models';
import hash from '../utils/hash';

require('../passport-setup.ts');

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

router.get('/google',
  passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback',
  passport.authenticate('google', {
    successRedirect: '/api/auth/good',
    failureRedirect: '/api/auth/fail',
  }));

router.get('/good', isLoggedIn, (req, res) => {
  res.send('Success Logged In');
});

router.get('/fail', (req, res) => {
  res.send('噢不，Google 登入發生了未知的錯誤！請聯絡管理員。');
});

router.get('/logout', (req, res, next) => {
  req.logout();
  req.session.destroy((err) => next(err));
  res.send('Goodbye');
});

export default router;
