import dayjs from 'dayjs';
import db, { pool } from '.';

const getAllExams = () => {
  const cols = ['document.docId', 'courseId', 'year', 'semester', 'title', 'description',  'document.userId', 'user.name', 'document.createTime', 'lastUpdateTime', 'FolderPath'];
  const sql = 'SELECT ??, COALESCE(SUM(score),0) AS `score` FROM `document` LEFT JOIN `vote` ON `document`.`docId` = `vote`.`docId` LEFT JOIN `user` ON `document`.`userId` = `user`.`userId` GROUP BY `document`.`docId`';
  return pool.promise().query(sql, [cols]);
};

const getExamById = (docId: number) => {
  const cols = ['document.docId', 'courseId', 'year', 'semester', 'title', 'description',  'document.userId', 'user.name', 'document.createTime', 'lastUpdateTime', 'FolderPath'];
  const sql = 'SELECT ??, COALESCE(SUM(score),0)AS `score` FROM `document` LEFT JOIN `vote` ON `document`.`docId` = `vote`.`docId` LEFT JOIN `user` ON `document`.`userId` = `user`.`userId` WHERE `document`.`docId` = ? GROUP BY `document`.`docId`';
  return pool.promise().query(sql, [cols, docId]);
};

const getExamByCourseId = (courseId: number) => {
  const cols = ['document.docId', 'courseId', 'year', 'semester', 'title', 'description',  'document.userId', 'user.name', 'document.createTime', 'lastUpdateTime', 'FolderPath'];
  const sql = 'SELECT ??, COALESCE(SUM(score),0) AS `score` FROM `document` LEFT JOIN `vote` ON `document`.`docId` = `vote`.`docId` LEFT JOIN `user` ON `document`.`userId` = `user`.`userId` WHERE `courseId` = ? GROUP BY `document`.`docId`';
  return pool.promise().query(sql, [cols, courseId]);
};
const addExam = async (
  userId: number,
  courseId: number,
  year: number,
  semester: number,
  title: string,
  description: string,
) => {
  const docId = await db.commentArea.addcommentArea();
  const folderPath = 'i am path, hi';
  const newExam = {
    docId,
    userId,
    courseId,
    year,
    semester,
    title,
    description,
    folderPath,
    createTime: dayjs().format(),
    lastUpdateTime: dayjs().format(),
  };
  const sql = 'INSERT INTO `document` SET ?';
  await pool.promise().query(sql, newExam);
  return docId;
};

export default {
  getAllExams,
  getExamById,
  addExam,
  getExamByCourseId,
};
