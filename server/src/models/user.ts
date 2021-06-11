import dayjs from 'dayjs';
import { Profile } from 'passport-google-oauth20';
import { pool } from '.';

const getAllUsers = () => {
  const sql = 'SELECT `userId`, `name` FROM user';
  return pool.promise().query(sql);
};

const getUserById = (userId: number) => {
  const sql = 'SELECT `userId`, `name` FROM `user` WHERE `userId` = ?';
  return pool.promise().query(sql, [userId]);
};

const getUserByEmail = (email: string) => {
  const sql = 'SELECT `userId`, `name` FROM `user` WHERE `email` = ?';
  return pool.promise().query(sql, [email]);
};

const findOrCreate = async (userInfo: Profile['_json']) => {
  const { sub, name, email } = userInfo;
  // Find user in DB
  let [rows] = await getUserByEmail(email);
  if (Array.isArray(rows) && rows.length > 0) return rows[0];
  // If it's not exist, create it
  const newUser = {
    name,
    email,
    createTime: dayjs().format(),
    googleId: sub,
  };
  const sql = 'INSERT INTO `user` SET ?';
  await pool.promise().query(sql, newUser);
  // Return user
  [rows] = await getUserByEmail(email);
  return rows[0];
};

export default {
  getAllUsers,
  getUserById,
  findOrCreate,
};
