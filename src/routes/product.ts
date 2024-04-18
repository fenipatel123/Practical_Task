import express from 'express';
import {addProduct,updateProduct,deleteProducts,getAllProducts,listProductWithPagination, getAllProductsWithFilters } from '../controller/product';
import {auth} from '../middleware/auth'
import {userauth} from '../middleware/userAuth'


const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Products
 *   description: API endpoints related to product operations
 */

/**
 * @swagger
 * /api/v1/addProduct:
 *   post:
 *     summary: Add a new product
 *     description: Add a new product to the system (admin only).
 *     tags: [Products]
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
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *               category:
 *                 type: string
 *                 description: ID of the category to which the product belongs
 *             required:
 *               - name
 *               - description
 *               - price
 *               - category
 *     responses:
 *       '201':
 *         description: Product added successfully
 *       '401':
 *         description: Unauthorized - Admin access only
 *       '500':
 *         description: Internal server error
 */
router.post('/addProduct',auth ,addProduct);
/**
 * @swagger
 * /api/v1/updateProduct/{id}:
 *   patch:
 *     summary: Update a product
 *     description: Update an existing product in the system (admin only).
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           description: ID of the product to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *               category:
 *                 type: string
 *                 description: ID of the category to which the product belongs
 *             oneOf:
 *               - required: [name]
 *               - required: [description]
 *               - required: [price]
 *               - required: [category]
 *     responses:
 *       '200':
 *         description: Product updated successfully
 *       '401':
 *         description: Unauthorized - Admin access only
 *       '404':
 *         description: Product not found
 *       '500':
 *         description: Internal server error
 */

router.patch('/updateProduct/:id',auth ,updateProduct);

/**
 * @swagger
 * /api/v1/deleteProducts/{id}:
 *   delete:
 *     summary: Delete a product
 *     description: Delete an existing product from the system (admin only).
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           description: ID of the product to delete
 *     responses:
 *       '200':
 *         description: Product deleted successfully
 *       '401':
 *         description: Unauthorized - Admin access only
 *       '404':
 *         description: Product not found
 *       '500':
 *         description: Internal server error
 */


router.delete('/deleteProducts/:id',auth ,deleteProducts);
/**
 * @swagger
 * /api/v1/getAllProducts:
 *   get:
 *     summary: Get all products
 *     description: Retrieve a list of all products in the system (accessible to logged-in users).
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Successful operation
 *       '401':
 *         description: Unauthorized - User not logged in
 *       '500':
 *         description: Internal server error
 */


router.get('/getAllProducts',userauth ,getAllProducts);

/**
 * @swagger
 * /api/v1/getAllProductsPagination:
 *   get:
 *     summary: Get paginated list of products
 *     description: Retrieve a paginated list of products with optional pagination parameters (admin and authenticated users).
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           description: Page number for pagination
 *         required: false
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           description: Limit of products per page
 *         required: false
 *     responses:
 *       '200':
 *         description: Successful operation, returns paginated product list
 *       '401':
 *         description: Unauthorized - Admin or authenticated user access only
 *       '500':
 *         description: Internal server error
 */


router.get('/getAllProductsPagination',userauth ,listProductWithPagination);

/**
 * @swagger
 * /api/v1/getAllProductsFilters:
 *   get:
 *     summary: Get products with optional filters
 *     description: Retrieve products with optional filters based on name, minimum price, and maximum price (admin and authenticated users).
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *           description: Product name for filtering
 *         required: false
 *       - in: query
 *         name: minPrice
 *         schema:
 *           type: number
 *           description: Minimum price for filtering
 *         required: false
 *       - in: query
 *         name: maxPrice
 *         schema:
 *           type: number
 *           description: Maximum price for filtering
 *         required: false
 *     responses:
 *       '200':
 *         description: Successful operation, returns filtered products
 *       '401':
 *         description: Unauthorized - Admin or authenticated user access only
 *       '500':
 *         description: Internal server error
 */


router.get('/getAllProductsFilters',userauth,getAllProductsWithFilters);

export default router;
