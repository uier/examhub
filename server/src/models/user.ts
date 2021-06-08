import { pool } from '.';

const getAllUsers = () => {
  const sql = 'SELECT userId, name, email, role, contribution, createTime FROM user';
  return pool.promise().query(sql);
};

export default {
  getAllUsers,
};
