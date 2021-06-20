import { Request, Response, NextFunction } from 'express';

export function isLoggedIn(req: Request, res: Response, next: NextFunction) {
  if (req.user) {
    next();
  } else {
    res.status(401).send('Please sign in first.');
  }
}

export function isEditor(req: Request, res: Response, next: NextFunction) {
  if (req.user) {
    if (req.user.role <= 1) {
      next();
    } else {
      res.status(403).send('Only EDITOR or a higher role can do this.');
    }
  } else {
    res.status(401).send('Please sign in first.');
  }
}

export function isAdmin(req: Request, res: Response, next: NextFunction) {
  if (req.user) {
    if (req.user.role === 0) {
      next();
    } else {
      res.status(403).send('Only ADMIN can do this.');
    }
  } else {
    res.status(401).send('Please sign in first.');
  }
}
