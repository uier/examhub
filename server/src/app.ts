import express from 'express';
import { requestLogger, errorLogger } from './middlewares/logger';
import { db } from './models';
import router from './routes';

require('dotenv').config();

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(requestLogger);
app.use(errorLogger);

db.init();

app.use('/api', router);

app.listen(port);

module.exports = app;
