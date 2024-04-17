import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from "dotenv";
import path from 'path';

// Load environment variables from .env file
dotenv.config({ path: path.join(__dirname, '..', '.env') });


export const userauth = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const authHeader = req.header('Authorization');
  
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      res.status(401).send({ message: 'Unauthorized - Please authenticate first!' });
      return;
    }
  
    const token = authHeader.split(' ')[1];
  
    try {
      const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);
      console.log(decoded)
  
      // Attach the user object to the request for further processing
      req.user = decoded;
      next();
    } catch (error) {
      res.status(500).send({ message: 'Internal server error while trying to proceed your request', error });
    }
  };
