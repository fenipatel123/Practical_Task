
import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
dotenv.config();
import mongooseConnection from './connection/db';

const app = express();
const PORT = process.env.PORT || 3000;

// Check MongoDB connection status
mongooseConnection.once('open', () => {
    console.log('MongoDB connection is open');
});

app.get('/', (req: Request, res: Response) => {
  res.send('Hello from Express + TypeScript server!');
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

