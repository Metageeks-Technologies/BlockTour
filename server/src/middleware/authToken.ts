import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from "dotenv";
dotenv.config


export const verifyToken = (req: any, res: Response, next: NextFunction) => {
  console.log("verifying token",req.cookies);
  try {
    const token = req.cookies.UserToken  || req.headers.authorization?.split(' ')[1];
    console.log("token",token)
    if (!token) {
     return res.status(401).send({success: false, message: "User not authenticated.Login to continue"});
      }
      
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY as string);
      console.log("decoded",decoded);
      req.user = decoded;
      console.log("req.user",req.user)
    next();
  } catch (error) {
    return res.status(401).send({success: false, message: "Invalid Token"});
  }
};