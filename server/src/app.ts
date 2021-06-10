import express from 'express';
import session from 'express-session';
import passport from 'passport';
import { requestLogger, errorLogger } from './middlewares/logger';
import db from './models';
import router from './routes';

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(session({
  secret: 'cats',
  resave: false,
  saveUninitialized: true,
}));
app.use(passport.initialize());
app.use(passport.session());

db.init();

app.use(requestLogger);

app.use('/api', router);

app.use(errorLogger);

app.listen(port);

module.exports = app;
