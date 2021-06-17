import { pool } from '.';
import console from 'console';

const addcommentArea = async () => {
  const sql = 'INSERT INTO `comment_area` VALUES()';
  const [result] = await pool.promise().query(sql);
  return Number(result["insertId"]);
}

export default {
  addcommentArea
};