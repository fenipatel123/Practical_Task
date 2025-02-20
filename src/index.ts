
import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
dotenv.config();
import bodyParser from 'body-parser';
import  specs  from './swaggerConfig';
import swaggerUi from 'swagger-ui-express'
import mongooseConnection from './connection/db';
import userRoutes from './routes/user';
import adminRoutes from './routes/admin';
import categoryRoutes from './routes/category';
import productRoutes from './routes/product';
import cartRoutes from './routes/cart';
import orderRoutes from './routes/order';


const app = express();
const PORT = process.env.PORT || 3000;

// Check MongoDB connection status
mongooseConnection.once('open', () => {
    console.log('MongoDB connection is open');
});

app.use(bodyParser.json())

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

app.use('/api/v1',userRoutes)
app.use('/api/v1',adminRoutes)
app.use('/api/v1',categoryRoutes)
app.use('/api/v1',productRoutes)
app.use('/api/v1',cartRoutes)
app.use('/api/v1',orderRoutes)

app.get('/', (req: Request, res: Response) => {
  res.send('Hello from Express + TypeScript server!');
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

