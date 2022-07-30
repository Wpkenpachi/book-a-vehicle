import { Request, Response, NextFunction } from 'express';
import { validateToken } from '../../../utils/jwt.utils';

export async function authorize(req: Request, res: Response, next: NextFunction) {
  try {
    let jwt = req.headers.authorization;
    // verify request has token
    if (!jwt) return res.status(401).json({ message: 'Invalid token' });
    // remove Bearer if using Bearer Authorization mechanism
    jwt = jwt.toLowerCase().startsWith('bearer') ? jwt.slice('bearer'.length).trim() : jwt;
    // verify token hasn't expired yet
    await validateToken(jwt);
    req.headers.authorization = jwt;
    next();
  } catch (error) {
    if ((error as Error).name === 'TokenExpiredError') return res.status(401).json({ message: 'Expired token' });
    res.status(500).json({ message: 'Failed to authenticate user' });
  }
};