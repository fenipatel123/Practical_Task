import { User } from './interface/user'; 
import { Request } from 'express';

declare module 'express' {
  interface Request {
    user?: User; 
  }
}