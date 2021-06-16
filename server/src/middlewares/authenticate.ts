import { Request, Response, NextFunction } from 'express';

export function isLoggedIn(req: Request, res: Response, next: NextFunction) {
  if (req.user) {
    next();
  } else {
    res.sendStatus(401);
  }
}

export function isEditor(req: Request, res: Response, next: NextFunction) {
  if (req.user && req.user.role <= 1) {
    next();
  } else {
    res.sendStatus(403);
  }
}

export function isAdmin(req: Request, res: Response, next: NextFunction) {
  if (req.user && req.user.role === 0) {
    next();
  } else {
    res.sendStatus(403);
  }
}
