import { pool } from '.';

const getRanking = () => {
  const sql = 'select `name`,`contribution` FROM `user` ORDER BY `contribution` DESC';
  return pool.promise().query(sql);
};

export default {
  getRanking,
};
