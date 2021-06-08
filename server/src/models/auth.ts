import { pool } from '.';

const signUpNewUser = (newUser: any) => pool.promise().query('INSERT INTO user SET ?', newUser);

export default {
  signUpNewUser,
};
