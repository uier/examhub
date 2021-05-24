import express from 'express';
import { requestLogger, errorLogger } from './middlewares/logger';
import router from './routes';

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(requestLogger);
app.use(errorLogger);

app.use('/api', router);

app.listen(port);

module.exports = app;
