/**
 * @swagger
 * tags:
 *   name: Categories
 *   description: API endpoints related to categories
 */

import express from 'express';
import { addCategories, getAllCategories, updateCategory, deleteCategory } from '../controller/category';
import {auth} from '../middleware/auth'
import {userauth} from '../middleware/userAuth'


const router = express.Router();

/**
 * @swagger
 * /api/v1/addCategory:
 *   post:
 *     summary: Add a new category
 *     description: Create a new category.
 *     tags: [Categories]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *             required:
 *               - name
 *     responses:
 *       '201':
 *         description: Category added successfully
 *       '401':
 *         description: Unauthorized - User not authenticated
 *       '500':
 *         description: Internal server error
 */

router.post('/addCategory',auth ,addCategories);

/**
 * @swagger
 * /api/v1/listCategory:
 *   get:
 *     summary: Get list of categories
 *     description: Retrieve the list of all categories.
 *     tags: [Categories]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Successful operation
 *       '401':
 *         description: Unauthorized - User not authenticated
 *       '500':
 *         description: Internal server error
 */
router.get('/listCategory',userauth,getAllCategories);

/**
 * @swagger
 * /api/v1/updateCategory/{id}:
 *   patch:
 *     summary: Update a category
 *     description: Update an existing category.
 *     tags: [Categories]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID of the category to update
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *             required:
 *               - name
 *     responses:
 *       '200':
 *         description: Category updated successfully
 *       '401':
 *         description: Unauthorized - User not authenticated
 *       '500':
 *         description: Internal server error
 */


router.patch('/updateCategory/:id',auth ,updateCategory);

/**
 * @swagger
 * /api/v1/deleteCategory/{id}:
 *   delete:
 *     summary: Delete a category
 *     description: Delete an existing category.
 *     tags: [Categories]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID of the category to delete
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Category deleted successfully
 *       '401':
 *         description: Unauthorized - User not authenticated
 *       '500':
 *         description: Internal server error
 */

router.delete('/deleteCategory/:id',auth ,deleteCategory);


export default router;
