import { pool } from '.';

const addVote = (userId: number, docId: number, score: number) => {
  const newVote = { userId, docId, score };
  const sql = 'INSERT INTO `vote` SET ?';
  return pool.promise().query(sql, newVote);
};

const getVote = (userId: number, docId: number) => {
  const sql = 'SELECT * FROM `vote` WHERE userId = ? AND docId = ?';
  return pool.promise().query(sql, [userId, docId]);
};

const modifyVote = (userId: number, docId: number, score: number) => {
  const sql = 'UPDATE `vote` SET `score` = ? WHERE userId = ? AND docId = ?';
  return pool.promise().query(sql, [score, userId, docId]);
};

export default {
  addVote,
  getVote,
  modifyVote,
};
