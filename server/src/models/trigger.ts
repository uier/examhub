export default [
  `
  DROP TRIGGER IF EXISTS insertVote;
  CREATE TRIGGER insertVote AFTER INSERT 
  ON vote FOR EACH ROW
  BEGIN
    UPDATE user SET contribution = contribution+1 WHERE user.userId = NEW.userId;
    IF NEW.score = 1 THEN
      UPDATE user SET contribution = contribution+1 WHERE user.userId in (SELECT userId FROM document WHERE docId = NEW.docId);
    END IF;
  END
  `,
  `
  DROP TRIGGER IF EXISTS deleteVote;
  CREATE TRIGGER deleteVote AFTER DELETE ON vote
  BEGIN
    UPDATE user SET contribution = contribution - 1 WHERE user.userId = OLD.userId;
    IF OLD.score = 1 THEN
      UPDATE user SET contribution = contribution - 1 WHERE user.userId = (SELECT userId FROM document WHERE docId = OLD.docId);
    END IF;
  END
  `,
  `
  DROP TRIGGER IF EXISTS updateVote;
  CREATE TRIGGER updateVote BEFORE UPDATE 
  ON vote FOR EACH ROW
  BEGIN
    IF NEW.score = 1 THEN
      UPDATE user SET contribution = contribution + 1 WHERE user.userId in (SELECT userId FROM document WHERE docId = NEW.docId);
    ELSEIF NEW.score = -1 THEN
      UPDATE user SET contribution = contribution - 1 WHERE user.userId in (SELECT userId FROM document WHERE docId = NEW.docId);
    END IF;
  END
  `,
  `
  DROP TRIGGER IF EXISTS addComment;
  CREATE TRIGGER addComment AFTER INSERT ON comment
  BEGIN
    UPDATE user SET contribution = contribution + 1 WHERE user.userId = NEW.userId and NEW.userId NOT IN (SELECT userId FROM comment WHERE comment.docId = NEW.docId);
  END
  `,
  `
  DROP TRIGGER IF EXISTS deleteComment;
  CREATE TRIGGER deleteComment AFTER DELETE ON comment
  BEGIN
    UPDATE user SET contribution = contribution - 1 WHERE user.userId = OLD.userId and OLD.userId NOT IN (SELECT userId FROM comment WHERE comment.docId = OLD.docId);
  END
  `,
  `
  DROP TRIGGER IF EXISTS addDocument;
  CREATE TRIGGER addDocument AFTER INSERT ON document
  BEGIN
    UPDATE user SET contribution = contribution + 5 WHERE user.userId = NEW.userId;
  END
  `,
  `
  DROP TRIGGER IF EXISTS delDocument;
  CREATE TRIGGER delDocument AFTER DELETE ON document
  BEGIN
    UPDATE user SET contribution = contribution - 5 WHERE user.userId = OLD.userId;
  END
  `,
];