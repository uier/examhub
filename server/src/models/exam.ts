import dayjs from 'dayjs';
import db, { pool } from '.';

const getAllExams = () => {
  const sql = 'SELECT `document`.`docId`, `courseId`, `year`, `semester`, `title`, `description`,  `document`.`userId`, `createTime`, `lastUpdateTime`, `folderPath`, COALESCE(SUM(score),0) AS `score` FROM `document` LEFT JOIN `vote` ON `document`.`docId` = `vote`.`docId` GROUP BY `document`.`docId`';
  return pool.promise().query(sql);
};

const getExamById = (docId: number) => {
  const sql = 'SELECT `document`.`docId`, `courseId`, `year`, `semester`, `title`, `description`,  `document`.`userId`, `createTime`, `lastUpdateTime`, `folderPath`, COALESCE(SUM(score),0)AS `score` FROM `document` LEFT JOIN `vote` ON `document`.`docId` = `vote`.`docId` WHERE `document`.`docId` = ? GROUP BY `document`.`docId`';
  return pool.promise().query(sql, [docId]);
};

const getExamByCourseId = (courseId: number) => {
  const sql = 'SELECT `document`.`docId`, `courseId`, `year`, `semester`, `title`, `description`,  `document`.`userId`, `createTime`, `lastUpdateTime`, `folderPath`, COALESCE(SUM(score),0) AS `score` FROM `document` LEFT JOIN `vote` ON `document`.`docId` = `vote`.`docId` WHERE `courseId` = ? GROUP BY `document`.`docId`';
  return pool.promise().query(sql, [courseId]);
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
