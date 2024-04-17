import express from 'express';
import { placeOrder} from '../controller/order';
import {userauth} from '../middleware/userAuth'

const router = express.Router();

router.post('/placeOrder', userauth,placeOrder);


export default router;
