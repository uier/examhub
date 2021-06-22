import { Router } from 'express';
import passport from 'passport';
import { isLoggedIn } from '../middlewares/authenticate';

require('../passport-setup');

const router: Router = Router();

router.get('/google',
  passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback',
  passport.authenticate('google', {
    successRedirect: '/api/auth/google/success',
    failureRedirect: '/api/auth/google/fail',
  }));

router.get('/google/success', isLoggedIn, (req, res) => {
  res.redirect('/');
});

router.get('/google/fail', (req, res) => {
  res.send('慘，不知道為什麼失敗了...');
});

router.get('/logout', isLoggedIn, (req, res) => {
  req.logout();
  res.sendStatus(200);
});

export default router;
