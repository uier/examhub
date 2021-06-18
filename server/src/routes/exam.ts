import { Express, Router } from 'express';
import console from 'console';
import { isLoggedIn, isAdmin } from '../middlewares/authenticate';
import db from '../models';
const router: Router = Router();

router.get('/', async (req, res, next) => {
  try {
    const courseId = req.query.courseId;
    if ( courseId === undefined ) {
      const [rows] = await db.exam.getAllExams();
      res.status(200).json(rows);
    } else {
      // check if courseId exist
      const checkResult = await db.exam.checkCourseIdExist(Number(courseId));
      const [check] = JSON.parse(JSON.stringify(checkResult));
      if( check.length > 0) {
        const result = await db.exam.getExamByCourseId(Number(courseId));
        const [rows] = JSON.parse(JSON.stringify(result));
        res.status(200).json(rows);
      } else {
        res.sendStatus(404);
      } 
    }  
  } catch (error) {
    res.status(500).json(error);
    next(error);
  }
});
//isLoggedIn
router.post('/', isLoggedIn, async (req, res, next) => {
  try {
    const { userId } = <Express.User>req.user;
    const { courseId, year, semester, title, description } = req.body;
    const [rows] = await db.exam.addExam( userId, courseId, year, semester, title, description);
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).json(error);
    next(error);
  }
});

router.get('/:docId', async (req, res, next) => {
  try {
    const result = await db.exam.getExamById(Number(req.params.docId));
    const [rows] = JSON.parse(JSON.stringify(result));
    if ( rows.length > 0) {
      res.status(200).json(rows[0]);
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    res.status(500).json(error);
    next(error);
  }
});

// 還沒有判斷權限（是否是admin or 發布者）
router.delete('/:docId', isLoggedIn, async (req, res, next) => {
  try {
      const [rows] = await db.commentArea.delCommentAreaById(Number(req.params.docId));
      res.status(200).json(rows);
  } catch (error) {
      res.status(500).json(error);
      next(error);
  }
});


export default router;