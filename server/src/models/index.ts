import mysql from 'mysql';

export const pool = mysql.createPool({
  connectionLimit: 10,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWD,
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
});

const initSQL = `
CREATE TABLE if not exists user (
  user_id varchar(32) not null,
  name    varchar(16) not null,
  email   varchar(40) not null,
  role    numeric(1, 0) check (role >= 0 and role <= 3),
  contribution  int not null,
  create_time   datetime not null,
  password      varchar(32) not null,
  primary key (user_id)
)`;

export const db = {
  init: () => {
    pool.query(initSQL, (error) => {
      if (error) throw error;
    });
  },
};
