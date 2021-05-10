import express from 'express';
import { requestLogger, errorLogger } from './middlewares/logger';

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(requestLogger);

app.get('/', (req, res) => {
  res.send('The server is working!');
});

app.use(errorLogger);

app.listen(port, () => {
  console.log(`server is listening on ${port}`);
});

module.exports = app;
