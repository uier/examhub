import dayjs from 'dayjs';
import db, { pool } from '.';

const getAllComments = () => {
  const sql = 'SELECT `comId`, `replyId`, `userId`, `content`, `createTime`, `lastUpdateTime` FROM `comment`';
  return pool.promise().query(sql);
};

const getCommentByAreaId = (AreaId: number) => {
  const sql = 'SELECT `comId`, `replyId`, `userId`, `content`, `createTime`, `lastUpdateTime` FROM `comment` WHERE `replyId` = ?';
  return pool.promise().query(sql, AreaId);
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
  return pool.promise().query(sql, newComment);
};

const getCommentPublisher = async (comId: number) => {
  const sql = 'SELECT `userId` from `comment` where `comId` = ?';
  const [result] = await pool.promise().query(sql, comId);
  return Number(result[0].userId);
};

const editComment = (userId: number, comId: number, content: string) => {
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
