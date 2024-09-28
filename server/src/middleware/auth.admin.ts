import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from "dotenv";
dotenv.config


export const verifyTokenAdmin = (req: any, res: Response, next: NextFunction) => {
  try {
    const token = req.cookies.AdminToken  || req.headers.authorization?.split(' ')[1];
    if (!token) {
     return res.status(401).send({success: false, message: "Admin not authenticated.Login to continue"});
      }
      
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY as string);
      req.admin = decoded;
    next();
  } catch (error) {
    return res.status(401).send({success: false, message: "Invalid Token"});
  }
};