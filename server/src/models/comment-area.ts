import { pool } from '.';
import console from 'console';

const addcommentArea = async () => {
  const sql = 'INSERT INTO `comment_area` VALUES()';
  const [result] = await pool.promise().query(sql);
  return Number(result["insertId"]);
}

const checkAreaIdExist = async (areaId: number) => {
  const sql = 'SELECT `areaId` from `comment_area` where `areaId` = ?';
  return pool.promise().query(sql, areaId);
}

const delCommentAreaById = (docId: number) => {
  const sql = 'DELETE FROM `comment_area` WHERE `areaId` = ?';
  return pool.promise().query(sql, [docId]);
}
export default {
  addcommentArea,
  checkAreaIdExist,
  delCommentAreaById,
};