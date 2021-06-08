import { pool } from '.';

const getAllUsers = () => pool.promise().query('SELECT * FROM user');

export default {
  getAllUsers,
};
