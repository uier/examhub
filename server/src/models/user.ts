import dayjs from 'dayjs';
import { Profile } from 'passport-google-oauth20';
import { pool } from '.';

const getAllUsers = () => {
  const sql = 'SELECT `userId`, `name`, `role`, `contribution`, `email`, `createTime` FROM `user`';
  return pool.promise().query(sql);
};

const getUserById = (userId: number, detail = false) => {
  const sql = detail ? 'SELECT `userId`, `name`, `role`, `contribution`, `email`, `createTime` FROM `user` WHERE `userID` = ?'
    : 'SELECT `userId`, `name`, `role` FROM `user` WHERE `userId` = ?';
  return pool.promise().query(sql, [userId]);
};

const getUserByEmail = (email: string) => {
  const sql = 'SELECT `userId`, `name`, `role` FROM `user` WHERE `email` = ?';
  return pool.promise().query(sql, [email]);
};

const modifyUser = (userId: number, name: string, role: number) => {
  const sql = 'UPDATE `user` SET `name` = ?, `role` = ? WHERE `userId` = ?';
  return pool.promise().query(sql, [name, role, userId]);
};

const findOrCreate = async (userInfo: Profile['_json']) => {
  const { sub, name, email } = userInfo;
  // Find user in DB
  let [rows] = JSON.parse(JSON.stringify(await getUserByEmail(email)));
  if (rows.length > 0) return rows[0];
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
  modifyUser,
  findOrCreate,
};
