import { Express, Router } from 'express';
import { OkPacket } from 'mysql2';
import { isLoggedIn } from '../middlewares/authenticate';
import db from '../models';

const router: Router = Router();

router.get('/', async (req, res, next) => {
  try {
    const { courseId } = req.query;
    if (courseId === undefined) {
      const [rows] = await db.exam.getAllExams();
      res.status(200).json(rows);
    } else {
      // check if courseId exist
      const checkResult = await db.course.getCourseById(Number(courseId));
      const [check] = JSON.parse(JSON.stringify(checkResult));
      if (check.length > 0) {
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

router.post('/', isLoggedIn, async (req, res, next) => {
  try {
    const { userId } = req.user as Express.User;
    const {
      courseId, year, semester, title, description,
    } = req.body;
    const checkResult = await db.course.getCourseById(Number(courseId));
    const [check] = JSON.parse(JSON.stringify(checkResult));
    if (check.length > 0) {
      const docId = await db.exam.addExam(
        userId,
        courseId,
        year,
        semester,
        title,
        description,
      ) as unknown as OkPacket[];
      res.status(200).json({ docId });
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    res.status(500).json(error);
    next(error);
  }
});

router.get('/:docId', async (req, res, next) => {
  try {
    const result = await db.exam.getExamById(Number(req.params.docId));
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

router.patch('/:docId', isLoggedIn, async (req, res, next) => {
  try {
    const { docId } = req.params;
    const {
      courseId, year, semester, title, description,
    } = req.body;
    const result = await db.exam.getExamById(Number(docId));
    const [rows] = JSON.parse(JSON.stringify(result));
    if (rows.length > 0) {
      await db.exam.editExamById(Number(docId), courseId, year, semester, title, description);
      res.sendStatus(200);
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

router.get('/:docId/vote', isLoggedIn, async (req, res, next) => {
  try {
    const { userId } = req.user as Express.User;
    const docId = Number(req.params.docId);
    const result = await db.vote.getVote(userId, docId);
    const [rows] = JSON.parse(JSON.stringify(result));
    if (rows.length > 0) {
      res.status(200).json(rows[0]);
    } else {
      res.status(200).json({ score: 0 });
    }
  } catch (error) {
    res.status(500).json(error);
    next(error);
  }
});

router.post('/:docId/vote', isLoggedIn, async (req, res, next) => {
  try {
    const { userId } = req.user as Express.User;
    const docId = Number(req.params.docId);
    const { score } = req.body;
    if (score !== 1 && score !== -1) {
      res.status(400).send('Value `score` must be `1` or `-1`');
    } else {
      let result = await db.exam.getExamById(docId);
      let [rows] = JSON.parse(JSON.stringify(result));
      if (rows.length > 0) {
        result = await db.vote.getVote(userId, docId);
        [rows] = JSON.parse(JSON.stringify(result));
        if (rows.length > 0) {
          if (rows[0].score === score) {
            await db.vote.deleteVote(userId, docId);
            res.sendStatus(200);
          } else {
            await db.vote.modifyVote(userId, docId, score);
            res.sendStatus(200);
          }
        } else {
          await db.vote.addVote(userId, docId, score);
          res.sendStatus(200);
        }
      } else {
        res.sendStatus(404);
      }
    }
  } catch (error) {
    res.status(500).json(error);
    next(error);
  }
});

export default router;
