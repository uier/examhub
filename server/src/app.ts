import express from 'express';
import * as Sentry from '@sentry/node';
import * as Tracing from '@sentry/tracing';
import session from 'express-session';
import passport from 'passport';
import { requestLogger, errorLogger } from './middlewares/logger';
import model from './models';
import router from './routes';

const app = express();
const port = process.env.PORT || 3000;

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  integrations: [
    new Sentry.Integrations.Http({ tracing: true }),
    new Tracing.Integrations.Express({ app }),
  ],
  tracesSampleRate: 1.0,
});

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

app.use(Sentry.Handlers.requestHandler());
app.use(Sentry.Handlers.tracingHandler());

app.use(requestLogger);

app.use('/api', router);

app.use(Sentry.Handlers.errorHandler());

app.use(errorLogger);

app.listen(port);

module.exports = app;
