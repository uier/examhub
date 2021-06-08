import express from 'express';
import { requestLogger, errorLogger } from './middlewares/logger';
import db from './models';
import router from './routes';

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

db.init();

app.use(requestLogger);

app.use('/api', router);

app.use(errorLogger);

app.listen(port);

module.exports = app;
