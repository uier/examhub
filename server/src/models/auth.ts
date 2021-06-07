import { pool } from '.';

const getAllUsers = () => pool.promise().query('SELECT * FROM user');

const addNewUser = (newUser: any) => pool.promise().query('INSERT INTO user SET ?', newUser);

export default {
  getAllUsers,
  addNewUser,
};
