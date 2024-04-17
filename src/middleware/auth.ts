import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import userModel from '../models/userModel';
import { User } from '../interface/user';
import dotenv from "dotenv";
import path from 'path';

// Load environment variables from .env file
dotenv.config({ path: path.join(__dirname, '..', '.env') });


export const auth = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const authHeader = req.header('Authorization');
  
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      res.status(401).send({ message: 'Unauthorized - Please authenticate first!' });
      return;
    }
  
    const token = authHeader.split(' ')[1];
  
    try {
      const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);
      const userId = decoded._id;
  
      // Check if the user exists and has the admin role
      const user: User | null = await userModel.findOne({ _id: userId });
  
      if (!user || user.role !== 'Admin') {
        res.status(403).send({ message: 'Forbidden - You do not have access!' });
        return;
      }
  
      // Attach the user object to the request for further processing
      req.user = user;
      next();
    } catch (error) {
      res.status(500).send({ message: 'Internal server error while trying to proceed your request', error });
    }
  };
