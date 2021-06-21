import express from 'express';
import session from 'express-session';
import passport from 'passport';
import { requestLogger, errorLogger } from './middlewares/logger';
import model from './models';
import router from './routes';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static('public'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(session({
  secret: process.env.SECRET as string,
  resave: false,
  saveUninitialized: true,
  cookie: {
    expires: new Date(Date.now() + (30 * 86400 * 1000)),
  },
}));
app.use(passport.initialize());
app.use(passport.session());

model.initDB();

app.use(requestLogger);

app.use('/api', router);

app.use(errorLogger);

app.listen(port);

module.exports = app;
