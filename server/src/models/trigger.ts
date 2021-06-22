export default [
  'DROP TRIGGER IF EXISTS `insertVote`; \
  CREATE TRIGGER `insertVote` AFTER INSERT \
  ON `vote` FOR EACH ROW \
    BEGIN \
      UPDATE `user` SET `contribution` = `contribution`+1 WHERE `user`.`userId` = NEW.`userId`; \
      IF NEW.`score` = 1 THEN \
        UPDATE user SET `contribution` = `contribution`+1 WHERE `user`.`userId` in (SELECT `userId` FROM `document` WHERE `docId` = NEW.`docId`); \
      END IF; \
    END'
  ,
  'DROP TRIGGER IF EXISTS deleteVote; \
  CREATE TRIGGER deleteVote AFTER DELETE \
  ON vote FOR EACH ROW \
    BEGIN \
      UPDATE user SET contribution = contribution - 1 WHERE user.userId = OLD.userId; \
      IF OLD.score = 1 THEN \
        UPDATE user SET contribution = contribution - 1 WHERE user.userId = (SELECT userId FROM document WHERE docId = OLD.docId); \
      END IF; \
    END'
  ,
  'DROP TRIGGER IF EXISTS updateVote; \
  CREATE TRIGGER updateVote BEFORE UPDATE \
  ON vote FOR EACH ROW \
    BEGIN \
      IF NEW.score = 1 THEN \
        UPDATE user SET contribution = contribution + 1 WHERE user.userId in (SELECT userId FROM document WHERE docId = NEW.docId); \
      ELSEIF NEW.score = -1 THEN \
        UPDATE user SET contribution = contribution - 1 WHERE user.userId in (SELECT userId FROM document WHERE docId = NEW.docId); \
      END IF; \
    END'
  ,
  'DROP TRIGGER IF EXISTS addComment; \
  CREATE TRIGGER addComment BEFORE INSERT \
  ON comment FOR EACH ROW \
    BEGIN \
      UPDATE user SET contribution = contribution + 1 \
      WHERE NEW.replyId in (SELECT docId as replyId FROM document) AND NEW.userId NOT IN (SELECT userId FROM comment WHERE comment.replyId = NEW.replyId); \
    END'
  ,
  'DROP TRIGGER IF EXISTS deleteComment; \
  CREATE TRIGGER deleteComment AFTER DELETE \
  ON comment FOR EACH ROW \
    BEGIN \
      UPDATE user SET contribution = contribution - 1 WHERE user.userId = OLD.userId AND OLD.userId NOT IN (SELECT userId FROM comment WHERE comment.docId = OLD.docId); \
    END'
  ,
  'DROP TRIGGER IF EXISTS addDocument; \
  CREATE TRIGGER addDocument AFTER INSERT \
  ON document FOR EACH ROW \
    BEGIN \
      UPDATE user SET contribution = contribution + 5 WHERE user.userId = NEW.userId; \
    END'
  ,
  'DROP TRIGGER IF EXISTS delDocument; \
  CREATE TRIGGER delDocument BEFORE DELETE \
  ON comment_area FOR EACH ROW \
    BEGIN \
      UPDATE user SET contribution = contribution - 5 WHERE EXISTS (SELECT docId from document WHERE OLD.areaId = docId AND user.userId = document.userId); \
    END'
  ,
];