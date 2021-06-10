/* eslint-disable camelcase */
import fs from 'fs';
import path from 'path';
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';

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
  done(null, user);
});

passport.deserializeUser((user: any, done) => {
  done(null, user);
});

passport.use(new GoogleStrategy({
  clientID: keys.client_id,
  clientSecret: keys.client_secret,
  callbackURL: keys.redirect_uris[0],
},
((accessToken, refreshToken, profile, done) => done(null, profile))));
