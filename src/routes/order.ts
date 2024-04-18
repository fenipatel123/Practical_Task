import express from 'express';
import { placeOrder} from '../controller/order';
import {userauth} from '../middleware/userAuth'

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Orders
 *   description: API endpoints related to placing orders
 */

/**
 * @swagger
 * /api/v1/placeOrder:
 *   post:
 *     summary: Place an order
 *     description: Place a new order with the items in the user's shopping cart.
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Order placed successfully
 *       '401':
 *         description: Unauthorized - User not logged in
 *       '500':
 *         description: Internal server error
 */

router.post('/placeOrder', userauth,placeOrder);


export default router;
