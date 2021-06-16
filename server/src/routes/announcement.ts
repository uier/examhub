import { Express, Router } from 'express';
import isLoggedIn from '../middlewares/authenticate';
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

// isAdmin?
router.post('/', isLoggedIn, async (req, res, next) => {
    try {
      const { userId } = <Express.User>req.user;
      await db.announcement.addAnnouncement(userId, req.body.title, req.body.content, req.body.pinned);
      res.status(200).json();
    } catch (error) {
      res.status(500).json(error);
      next(error);
    }
  });

router.get('/:annId', async (req, res, next) => {
  try {
    const [rows] = JSON.parse(JSON.stringify(await db.announcement.getAnnouncementById(Number(req.params.annId))));
    if( rows.length > 0) {
      res.status(200).json(rows[0]); 
    }
    else {
      res.sendStatus(404);
    }
    
  } catch (error) {
    res.status(500).json(error);
    next(error);
  }
});

//isAdmin
router.delete('/:annId', isLoggedIn, async (req, res, next) => {
  try {
    const [rows] = JSON.parse(JSON.stringify(await db.announcement.getAnnouncementById(Number(req.params.annId))));
    if( rows.length > 0) {
      await db.announcement.delAnnouncementById(Number(req.params.annId));
      res.sendStatus(200);
    }
    else {
      res.sendStatus(404);
    }
    
  } catch (error) {
    res.status(500).json(error);
    next(error);
  }
});

export default router;