import { Router } from 'express';
import { isLoggedIn, isAdmin } from '../middlewares/authenticate';
import db from '../models';

const router: Router = Router();

router.get('/', async (req, res, next) => {
  try {
    const [rows] = await db.course.getAllcourse();
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).json(error);
    next(error);
  }
});

router.get('/:courseId', async (req, res, next) => {
  try {
    const result = await db.course.getCourseById(Number(req.params.courseId));
    const [rows] = JSON.parse(JSON.stringify(result));
    if (rows.length > 0) {
      res.status(200).json(rows[0]);
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    res.status(500).json(error);
    next(error);
  }
});

router.post('/', isLoggedIn, async (req, res, next) => {
  try {
    const {
      courseName, deptName, category, description,
    } = req.body;
    await db.course.addCourse(courseName, deptName, category, description);
    res.status(200).json();
  } catch (error) {
    res.status(500).json(error);
    next(error);
  }
});

router.delete('/:courseId', isAdmin, async (req, res, next) => {
  try {
    const result = await db.course.getCourseById(Number(req.params.courseId));
    const [rows] = JSON.parse(JSON.stringify(result));
    if (rows.length > 0) {
      await db.course.delCourseById(Number(req.params.courseId));
      res.sendStatus(200);
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    res.status(500).json(error);
    next(error);
  }
});

router.patch('/:courseId', isAdmin, async (req, res, next) => {
  try {
    const { courseId } = req.params;
    const {
      courseName, deptName, category, description,
    } = req.body;
    const result = await db.course.getCourseById(Number(courseId));
    const [rows] = JSON.parse(JSON.stringify(result));
    if (rows.length > 0) {
      await db.course.editCourseById(Number(courseId), courseName, deptName, category, description);
      res.sendStatus(200);
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    res.status(500).json(error);
    next(error);
  }
});

export default router;
