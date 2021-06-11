/* eslint-disable camelcase */
import { Express } from 'express';
import fs from 'fs';
import path from 'path';
import passport from 'passport';
import { Profile, Strategy as GoogleStrategy } from 'passport-google-oauth20';
import model from './models';

interface OAuth2WebKeys {
  client_id: string
  project_id: string
  auth_uri: string
  token_uri: string
  auth_provider_x509_cert_url: string
  client_secret: string
  redirect_uris: string[]
}

const keyPath = path.join(__dirname, 'oauth2.keys.json');
if (!fs.existsSync(keyPath)) throw new Error('missing oauth2.keys.json');
// eslint-disable-next-line import/no-dynamic-require, global-require
const keys: OAuth2WebKeys = require(keyPath).web;

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
  clientID: keys.client_id,
  clientSecret: keys.client_secret,
  callbackURL: keys.redirect_uris[0],
},
(async (accessToken, refreshToken, profile: Profile, done) => {
  try {
    const user = await model.user.findOrCreate(profile._json);
    return done(null, user);
  } catch (err) {
    return done(err);
  }
})));
