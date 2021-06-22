import { pool } from '.';

const getAllcourse = () => {
  const sql = 'SELECT course.*, COUNT(docId) AS docNum FROM `course` LEFT JOIN `document` ON course.courseId = document.courseId GROUP BY(courseId) ORDER BY `courseName`';
  return pool.promise().query(sql);
};

const addCourse = (courseName: string, deptName: string, category: string, description: string) => {
  const newCourse = {
    courseName,
    deptName,
    category,
    description,
  };
  const sql = 'INSERT INTO `course` SET ?';
  return pool.promise().query(sql, newCourse);
};

const getCourseById = (courseId: number) => {
  const sql = 'SELECT * FROM `course` WHERE `courseId` = ?';
  return pool.promise().query(sql, courseId);
};

const delCourseById = (courseId: number) => {
  const sql = 'DELETE FROM `course` WHERE `courseId` = ?';
  return pool.promise().query(sql, courseId);
};

const editCourseById = (
  courseId: number,
  courseName: string,
  deptName: string,
  category: string,
  description: string,
) => {
  const editCourse = {
    courseName,
    deptName,
    category,
    description,
  };
  const sql = 'UPDATE `course` SET ? WHERE `courseId` = ?';
  return pool.promise().query(sql, [editCourse, courseId]);
};

export default {
  getAllcourse,
  addCourse,
  getCourseById,
  delCourseById,
  editCourseById,
};
