import { Request, Response, NextFunction } from 'express';

const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.status(401).json({ error: 'User not authenticated' });
  }
};

export default isAuthenticated;
