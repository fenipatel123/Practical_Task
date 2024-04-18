import express from 'express';
import { addToCart, updateCart, removeFromCart} from '../controller/cart';
import {userauth} from '../middleware/userAuth'

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Cart
 *   description: API endpoints related to the shopping cart
 */

/**
 * @swagger
 * /api/v1/addToCart:
 *   post:
 *     summary: Add item to cart
 *     description: Add a product to the user's shopping cart.
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               productId:
 *                 type: string
 *               quantity:
 *                 type: integer
 *             required:
 *               - productId
 *               - quantity
 *     responses:
 *       '200':
 *         description: Item added to cart successfully
 *       '401':
 *         description: Unauthorized - User not logged in
 *       '500':
 *         description: Internal server error
 */

router.post('/addToCart', userauth,addToCart);

/**
 * @swagger
 * /api/v1/updateCart:
 *   patch:
 *     summary: Update cart item
 *     description: Update the quantity of a product in the user's shopping cart.
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               productId:
 *                 type: string
 *               quantity:
 *                 type: integer
 *             required:
 *               - productId
 *               - quantity
 *     responses:
 *       '200':
 *         description: Cart item updated successfully
 *       '401':
 *         description: Unauthorized - User not logged in
 *       '500':
 *         description: Internal server error
 */

router.patch('/updateCart', userauth,updateCart);

/**
 * @swagger
 * /api/v1/removeFromCart:
 *   delete:
 *     summary: Remove item from cart
 *     description: Remove a product from the user's shopping cart.
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               productId:
 *                 type: string
 *             required:
 *               - productId
 *     responses:
 *       '200':
 *         description: Product removed from cart successfully
 *       '401':
 *         description: Unauthorized - User not logged in
 *       '500':
 *         description: Internal server error
 */

router.delete('/removeFromCart', userauth,removeFromCart);






export default router;
