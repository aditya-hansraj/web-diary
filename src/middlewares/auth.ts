import { Request, Response, NextFunction } from 'express';
import { response } from '../types/response'; 

const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.status(401).json({...response, error: 'User not authenticated' });
  }
};

export default isAuthenticated;
