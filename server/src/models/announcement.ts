import dayjs from 'dayjs';
import { pool } from '.';

const getAllAnnouncements = () => {
  const cols = ['annId', 'userId', 'name', 'title', 'content', 'pinned', 'createTime', 'lastUpdateTime'];
  const sql = 'SELECT ?? FROM `announcement` inner join (SELECT `userId`, `name` FROM `user`) as U USING (userId)';
  return pool.promise().query(sql, [cols]);
};

const getAnnouncementById = (annId: number) => {
  const sql = 'SELECT `title`, `content`, `pinned`, `createTime`, `lastUpdateTime` FROM `announcement` WHERE `annId` = ?';
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

const editAnnouncementById = (annId: number, title: string, content: string, pinned: boolean) => {
  const newAnnouncement = {
    title,
    content,
    pinned,
    lastUpdateTime: dayjs().format(),
  };
  const sql = 'UPDATE `announcement` SET ? WHERE `annId` = ?';
  return pool.promise().query(sql, [newAnnouncement, annId]);
};

const delAnnouncementById = (annId: number) => {
  const sql = 'DELETE FROM `announcement` WHERE `annId` = ?';
  return pool.promise().query(sql, [annId]);
};

export default {
  getAllAnnouncements,
  getAnnouncementById,
  addAnnouncement,
  editAnnouncementById,
  delAnnouncementById,
};
