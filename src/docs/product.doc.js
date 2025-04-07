// docs/product.doc.js

/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           minLength: 2
 *         price:
 *           type: number
 *         color:
 *           type: string
 *           minLength: 2
 *         photo:
 *           type: string
 *         categoryId:
 *           type: integer
 */

/**
 * @swagger
 * /product:
 *   get:
 *     summary: Get all products with pagination and filtering
 *     tags: [Product]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *         description: Page number for pagination
 *       - in: query
 *         name: take
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 10
 *         description: Number of items per page
 *       - in: query
 *         name: gtePrice
 *         schema:
 *           type: integer
 *         description: Filter products with price greater than or equal to this value
 *       - in: query
 *         name: contains
 *         schema:
 *           type: string
 *         description: Filter products by name or color (case-insensitive)
 *       - in: query
 *         name: categoryId
 *         schema:
 *           type: integer
 *         description: Filter products by category ID
 *     responses:
 *       200:
 *         description: List of products with pagination and filtering
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 *       500:
 *         description: Server error
 *
 *   post:
 *     summary: Create a new product
 *     tags: [Product]
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
 *                 minLength: 2
 *               price:
 *                 type: number
 *               color:
 *                 type: string
 *                 minLength: 2
 *               photo:
 *                 type: string
 *               categoryId:
 *                 type: integer
 *             required:
 *               - name
 *               - price
 *               - color
 *               - photo
 *               - categoryId
 *           examples:
 *             newProduct:
 *               value:
 *                 name: "Smartphone"
 *                 price: 599.99
 *                 color: "Black"
 *                 photo: "http://example.com/photo.jpg"
 *                 categoryId: 1
 *     responses:
 *       201:
 *         description: Product created successfully
 *         content:
 *           application/json:
 *             example:
 *               message: "Product created successfully"
 *               product:
 *                 name: "Smartphone"
 *                 price: 599.99
 *                 color: "Black"
 *                 photo: "http://example.com/photo.jpg"
 *                 categoryId: 1
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized - Admin access required
 */

/**
 * @swagger
 * /product/{id}:
 *   get:
 *     summary: Get a product by ID
 *     tags: [Product]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: The product ID
 *     responses:
 *       200:
 *         description: Product details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: Product not found
 *
 *   patch:
 *     summary: Update product by ID
 *     tags: [Product]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: The product ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 minLength: 2
 *               price:
 *                 type: number
 *               color:
 *                 type: string
 *                 minLength: 2
 *               photo:
 *                 type: string
 *               categoryId:
 *                 type: integer
 *           examples:
 *             updateProduct:
 *               value:
 *                 name: "Updated Smartphone"
 *                 price: 649.99
 *                 color: "Silver"
 *     responses:
 *       200:
 *         description: Product updated successfully
 *         content:
 *           application/json:
 *             example:
 *               message: "Product updated successfully"
 *               product:
 *                 name: "Updated Smartphone"
 *                 price: 649.99
 *                 color: "Silver"
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized - Admin or Super Admin access required
 *       404:
 *         description: Product not found
 *
 *   delete:
 *     summary: Delete product by ID
 *     tags: [Product]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: The product ID
 *     responses:
 *       200:
 *         description: Product deleted successfully
 *         content:
 *           application/json:
 *             example:
 *               message: "Product deleted successfully"
 *       401:
 *         description: Unauthorized - Admin access required
 *       404:
 *         description: Product not found
 */