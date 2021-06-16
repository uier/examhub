import dayjs from 'dayjs';
import { pool } from '.';

const getAllAnnouncements = () => {
  const sql = 'select `annId`, `userId`, `title`, `pinned`, `createTime`, `lastUpdateTime` FROM `announcement`';
  return pool.promise().query(sql);
};

const getAnnouncementById = (annId: number) => {
  const sql = 'select `title`, `content`, `pinned`, `createTime`, `lastUpdateTime` FROM `announcement` WHERE `annId` = ?';
  return pool.promise().query(sql, [annId]);
};

const addAnnouncement = async (userId: number, title: string, content: string, pinned: boolean) => {
  const newAnnouncement = {
    userId,
    title,
    content,
    pinned,
    createTime: dayjs().format(),
    lastUpdateTime: dayjs().format(),
  };
  const sql = 'INSERT INTO `announcement` SET ?';
  return pool.promise().query(sql, newAnnouncement);
};

const delAnnouncementById = async (annId: number) => {
  const sql = 'DELETE FROM `announcement` WHERE `annId` = ?';
  return pool.promise().query(sql, [annId]);
};

export default {
  getAllAnnouncements,
  getAnnouncementById,
  addAnnouncement,
  delAnnouncementById,
};
