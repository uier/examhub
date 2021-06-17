import mysql from 'mysql2';
import user from './user';
import schema from './schema';
import announcement from './announcement';
import exam from './exam';
import commentArea from './comment-area';

export const pool = mysql.createPool({
  connectionLimit: 10,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWD,
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
});

export default {
  // initialize db schema with prepared sql queries
  initDB: () => {
    schema.forEach((s) => {
      pool.query(s, (error) => {
        if (error) throw error;
      });
    });
  },
  // export the models below
  user,
  announcement,
  exam,
  commentArea,
};
