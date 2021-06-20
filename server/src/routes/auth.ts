import { Router } from 'express';
import passport from 'passport';
import { isLoggedIn } from '../middlewares/authenticate';

require('../passport-setup.ts');

const router: Router = Router();

router.get('/google',
  passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback',
  passport.authenticate('google', {
    successRedirect: '/api/auth/google/success',
    failureRedirect: '/api/auth/google/fail',
  }));

router.get('/google/success', isLoggedIn, (req, res) => {
  res.redirect('//localhost:8080');
});

router.get('/google/fail', (req, res) => {
  res.send('慘，不知道為什麼失敗了...');
  // res.redirect('//localhost:8080/login?err=true');
});

router.get('/logout', isLoggedIn, (req, res, next) => {
  req.logout();
  req.session.destroy((err) => {
    res.sendStatus(500);
    next(err);
  });
  res.sendStatus(200);
});

export default router;
