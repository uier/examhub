import { Express, Router } from 'express';
import { OkPacket } from 'mysql2';
import { isLoggedIn } from '../middlewares/authenticate';
import db from '../models';

const router: Router = Router();

router.get('/', async (req, res, next) => {
  try {
    const { areaId } = req.query;
    if (areaId === undefined) {
      const [rows] = await db.comment.getAllComments();
      res.status(200).json(rows);
    } else {
      // check if areaId exist
      const checkResult = await db.commentArea.checkAreaIdExist(Number(areaId));
      const [check] = JSON.parse(JSON.stringify(checkResult));
      if (check.length > 0) {
        const result = await db.comment.getCommentByAreaId(Number(areaId));
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
    const { replyId, content } = req.body;
    const checkResult = await db.commentArea.checkAreaIdExist(Number(replyId));
    const [check] = JSON.parse(JSON.stringify(checkResult));
    if (check.length > 0) {
      const comId = await db.comment.addComment(
        userId,
        replyId,
        content,
      ) as unknown as OkPacket[];
      res.status(200).json(comId);
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    res.status(500).json(error);
    next(error);
  }
});

router.patch('/:comId', isLoggedIn, async (req, res, next) => {
  try {
    const publisher = await db.comment.getCommentPublisher(Number(req.params.comId));
    const { userId } = req.user as Express.User;
    const { comId } = req.params;
    const { content } = req.body;
    if (userId === publisher) {
      const [result] = await db.comment.editComment(Number(comId), content);
      res.status(200).json(result);
    } else {
      res.sendStatus(403);
    }
  } catch (error) {
    res.status(500).json(error);
    next(error);
  }
});

router.delete('/:comId', isLoggedIn, async (req, res, next) => {
  try {
    const publisher = await db.comment.getCommentPublisher(Number(req.params.comId));
    const { userId, role } = req.user as Express.User;
    if (userId === publisher || role <= 1) {
      const [rows] = await db.commentArea.delCommentAreaById(Number(req.params.comId));
      res.status(200).json(rows);
    } else {
      res.sendStatus(403);
    }
  } catch (error) {
    res.status(500).json(error);
    next(error);
  }
});

export default router;
