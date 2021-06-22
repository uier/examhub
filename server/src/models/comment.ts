import dayjs from 'dayjs';
import db, { pool } from '.';

const getAllComments = () => {
  const cols = ['comId', 'replyId', 'userId', 'content', 'createTime', 'lastUpdateTime'];
  const sql = 'SELECT ?? FROM `comment` inner join (SELECT `userId`, `name` FROM `user`) as U USING (userId) ';
  return pool.promise().query(sql, [cols]);
};

const getCommentByAreaId = (AreaId: number) => {
  const cols = ['comId', 'replyId', 'userId', 'name', 'content', 'createTime', 'lastUpdateTime'];
  const sql = 'SELECT ?? FROM `comment` inner join (SELECT `userId`, `name` FROM `user`) as U USING (userId) WHERE `replyId` = ? ORDER BY `createTime` ASC';
  return pool.promise().query(sql, [cols, AreaId]);
};

const addComment = async (userId: number, replyId: number, content: string) => {
  const comId = await db.commentArea.addcommentArea();
  const newComment = {
    comId,
    userId,
    replyId,
    content,
    createTime: dayjs().format(),
    lastUpdateTime: dayjs().format(),
  };
  const sql = 'INSERT INTO `comment` SET ?';
  await pool.promise().query(sql, newComment);
  return comId;
};

const getCommentPublisher = async (comId: number) => {
  const sql = 'SELECT `userId` from `comment` where `comId` = ?';
  const [result] = await pool.promise().query(sql, comId);
  return Number(result[0].userId);
};

const editComment = (comId: number, content: string) => {
  const newComment = {
    content,
    lastUpdateTime: dayjs().format(),
  };
  const sql = 'UPDATE `comment` SET ? WHERE `comId` = ?';
  return pool.promise().query(sql, [newComment, comId]);
};

export default {
  getAllComments,
  getCommentByAreaId,
  addComment,
  getCommentPublisher,
  editComment,
};
