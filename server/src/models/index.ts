import mysql from 'mysql2';
import user from './user';
import schema from './schema';
import announcement from './announcement';
import ranking from './ranking';
import exam from './exam';
import commentArea from './comment-area';
import comment from './comment';
import course from './course';
import vote from './vote';

export const pool = mysql.createPool({
  connectionLimit: 10,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
});

const attemptConnection = (sql: string) => {
  pool.getConnection((err, connection) => {
    if (err) {
      console.log(`Connection failed: ${err}, Retrying connection in 2 seconds...`)
      setTimeout(() => attemptConnection(sql), 2000);
    } else {
      connection.query(sql, (error) => {
        connection.release();
        if (error) {
          console.log(`Initialize schema (${sql.slice(0, 40)}) failed: ${error}`);
        }
      });
    }
  })
}

export default {
  // initialize db schema with prepared sql queries
  initDB: () => {
    schema.forEach((s) => {
      attemptConnection(s)
    });
  },
  // export the models below
  user,
  announcement,
  ranking,
  exam,
  commentArea,
  comment,
  course,
  vote,
};
