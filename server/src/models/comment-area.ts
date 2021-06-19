import { OkPacket } from 'mysql2';
import { pool } from '.';

const addcommentArea = async () => {
  const sql = 'INSERT INTO `comment_area` VALUES()';
  const [result] = await pool.promise().query(sql) as unknown as OkPacket[];
  return Number(result.insertId);
};

export default {
  addcommentArea,
};
