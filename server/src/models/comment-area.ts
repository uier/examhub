import { OkPacket } from 'mysql2';
import { pool } from '.';

const addcommentArea = async () => {
  const sql = 'INSERT INTO `comment_area` VALUES()';
  const [result] = await pool.promise().query(sql) as unknown as OkPacket[];
  return Number(result.insertId);
};

const checkAreaIdExist = async (areaId: number) => {
  const sql = 'SELECT `areaId` from `comment_area` where `areaId` = ?';
  return pool.promise().query(sql, areaId);
};

const delCommentAreaById = (docId: number) => {
  const sql = 'DELETE FROM `comment_area` WHERE `areaId` = ?';
  return pool.promise().query(sql, [docId]);
};

export default {
  addcommentArea,
  checkAreaIdExist,
  delCommentAreaById,
};
