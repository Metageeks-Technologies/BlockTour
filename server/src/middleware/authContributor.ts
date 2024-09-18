import { Request, Response, NextFunction } from 'express';

// Middleware to check if the user is a contributor
const authContributor = (req: any, res: Response, next: NextFunction) => {
  const { id } = req.user as { id: string };  
  
  if ( req.user && req.user.contributor ) {
    next();
  } else {
    res.status(403).send('Forbidden: Contributor access required');
  }
};

export default authContributor;