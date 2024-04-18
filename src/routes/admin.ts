import express, { Router } from 'express';
import { loginAdminUser } from '../controller/admin';

const router :Router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Admin
 *   description: API endpoints related to admin operations
 */

/**
 * @swagger
 * /api/v1/adminlogin:
 *   post:
 *     summary: Login as admin
 *     description: Log in using admin credentials to access admin functionalities.
 *     tags: [Admin]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *             required:
 *               - email
 *               - password
 *     responses:
 *       '200':
 *         description: Successful admin login
 *       '401':
 *         description: Unauthorized - Invalid credentials
 *       '500':
 *         description: Internal server error
 */

router.post('/adminlogin', loginAdminUser);

export default router;
