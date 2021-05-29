import { pool } from '.';

const getAllUsers = () => new Promise((resolve, reject) => {
  pool.query('SELECT * FROM user', (error, results) => {
    if (error) {
      reject(error);
    }
    resolve(results);
  });
});

const addNewUser = (newUser: any) => new Promise((resolve, reject) => {
  pool.query('INSERT INTO user SET ?', newUser, (error, results) => {
    if (error) {
      reject(error);
    }
    resolve(results);
  });
});

export default {
  getAllUsers,
  addNewUser,
};
