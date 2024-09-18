import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface JwtPayload {
  id: string;
}

interface AuthenticatedRequest extends Request {
  user?: JwtPayload;
}

const authAdmin = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const token = req?.cookies?.Token || req?.header('Authorization')?.replace('Bearer ', '');
  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  try {
    const secretKey = process.env.JWT_SECRET_KEY;
    if (!secretKey) {
      throw new Error('JWT secret key is not defined');
    }

    const decoded = jwt.verify(token, secretKey) as JwtPayload;
    req.user = decoded;
    next();
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      return res.status(400).json({ message: 'Invalid token.' });
    }
    res.status(500).json({ message: 'Internal server error.' });
  }
};

export default authAdmin;