import { Express, Router } from 'express';
import { OkPacket } from 'mysql2';
import { isEditor } from '../middlewares/authenticate';
import db from '../models';

const router: Router = Router();

router.get('/', async (req, res, next) => {
  try {
    const [rows] = await db.announcement.getAllAnnouncements();
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).json(error);
    next(error);
  }
});

router.post('/', isEditor, async (req, res, next) => {
  try {
    const { userId } = req.user as Express.User;
    const { title, content, pinned } = req.body;
    const [result] = await db.announcement.addAnnouncement(
      userId,
      title,
      content,
      pinned,
    ) as unknown as OkPacket[];
    res.status(200).json({ annId: result.insertId });
  } catch (error) {
    res.status(500).json(error);
    next(error);
  }
});

router.get('/:annId', async (req, res, next) => {
  try {
    const result = await db.announcement.getAnnouncementById(Number(req.params.annId));
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

router.patch('/:annId', isEditor, async (req, res, next) => {
  try {
    const { annId } = req.params;
    const { title, content, pinned } = req.body;
    const result = await db.announcement.getAnnouncementById(Number(annId));
    const [rows] = JSON.parse(JSON.stringify(result));
    if (rows.length > 0) {
      await db.announcement.editAnnouncementById(Number(annId), title, content, pinned);
      res.sendStatus(200);
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    res.status(500).json(error);
    next(error);
  }
});

router.delete('/:annId', isEditor, async (req, res, next) => {
  try {
    const result = await db.announcement.getAnnouncementById(Number(req.params.annId));
    const [rows] = JSON.parse(JSON.stringify(result));
    if (rows.length > 0) {
      await db.announcement.delAnnouncementById(Number(req.params.annId));
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
