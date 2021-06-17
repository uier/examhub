import dayjs from 'dayjs';
import { pool } from '.';

const getAllExams = () => {
  const sql = 'SELECT `docId`, `courseId`, `year`, `semester`, `title`, `description`, `userId`, `createTime`, `lastUpdateTime`, `upvote`, `downvote`, `folderPath` FROM `document`';
  return pool.promise().query(sql);
};

const getExamById = (docId: number) => {
  const sql = 'SELECT `docId`, `courseId`, `year`, `semester`, `title`, `description`, `userId`, `createTime`, `lastUpdateTime`, `upvote`, `downvote`, `folderPath` FROM `document` WHERE `docId` = ?';
  return pool.promise().query(sql, [docId]);
}

const addExam = async ( userId: number, courseId: number, year: number, semester: number, title: string, description: string) => {
    const newExam = {
        userId,
        courseId,
        year,
        semester,
        title,
        description,
        createTime: dayjs().format(),
        lastUpdateTime: dayjs().format(),
    };
    const sql = 'INSERT INTO `document` SET ?';
    return pool.promise().query(sql, newExam);
}

const editExamById = async (docId: number) => {
    const sql = 'UPDATE `document` WHERE `docId` = ?';
    return pool.promise().query(sql, [docId]);
}

const checkCourseIdExist = (courseId: number) => {
  const sql = 'SELECT `docId` FROM `document` WHERE `courseId` = ?';
  return pool.promise().query(sql, [courseId]);
}

const getExamByCourseId = (courseId: number) => {
  const sql = 'SELECT `docId` FROM `document` WHERE `courseId` = ?';
  return pool.promise().query(sql, [courseId]);
}

export default {
  getAllExams,
  getExamById,
  addExam,
  editExamById,
  checkCourseIdExist,
  getExamByCourseId
};