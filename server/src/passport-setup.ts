import { Express } from 'express';
import passport from 'passport';
import { Profile, Strategy as GoogleStrategy } from 'passport-google-oauth20';
import model from './models';
import { web } from './config/oauth2.keys.json';

passport.serializeUser((user, done) => {
  done(null, user.userId);
});

passport.deserializeUser(async (userId: Express.User['userId'], done) => {
  try {
    const [rows] = await model.user.getUserById(userId);
    done(null, rows[0]);
  } catch (err) {
    done(err, false);
  }
});

passport.use(new GoogleStrategy({
  clientID: web.client_id,
  clientSecret: web.client_secret,
  callbackURL: web.redirect_uris[0],
},
(async (accessToken, refreshToken, profile: Profile, done) => {
  try {
    const user = await model.user.findOrCreate(profile._json);
    return done(null, user);
  } catch (err) {
    return done(err);
  }
})));
