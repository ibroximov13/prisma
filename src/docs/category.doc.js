// docs/category.doc.js

/**
 * @swagger
 * tags:
 *   name: Category
 *   description: Category CRUD APIs
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Category:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           minLength: 3
 *           maxLength: 55
 *         photo:
 *           type: string
 */

/**
 * @swagger
 * /category:
 *   get:
 *     summary: Get all categories with pagination, filtering, and sorting
 *     tags: [Category]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number for pagination
 *       - in: query
 *         name: take
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Number of categories to return per page
 *       - in: query
 *         name: contains
 *         schema:
 *           type: string
 *         description: Filter categories by ID or name (case-insensitive)
 *       - in: query
 *         name: column
 *         schema:
 *           type: string
 *           enum: ["id", "name"]
 *           default: "id"
 *         description: Column to sort by
 *       - in: query
 *         name: order
 *         schema:
 *           type: string
 *           enum: ["ASC", "DESC"]
 *           default: "ASC"
 *         description: Sort order (ascending or descending)
 *     responses:
 *       200:
 *         description: List of categories based on pagination, filter, and sort criteria
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Category'
 *             example:
 *               - id: "cat1"
 *                 name: "Electronics"
 *                 photo: "http://example.com/electronics.jpg"
 *               - id: "cat2"
 *                 name: "Books"
 *                 photo: "http://example.com/books.jpg"
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /category/{id}:
 *   get:
 *     summary: Get category by ID
 *     tags: [Category]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The category ID
 *     responses:
 *       200:
 *         description: Category details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Category'
 *       404:
 *         description: Category not found
 */

/**
 * @swagger
 * /category:
 *   post:
 *     summary: Create a new category
 *     tags: [Category]
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
 *                 minLength: 3
 *                 maxLength: 55
 *               photo:
 *                 type: string
 *             required:
 *               - name
 *               - photo
 *           examples:
 *             newCategory:
 *               value:
 *                 name: "Electronics"
 *                 photo: "http://example.com/electronics.jpg"
 *     responses:
 *       201:
 *         description: Category created successfully
 *         content:
 *           application/json:
 *             example:
 *               message: "Category created successfully"
 *               category:
 *                 name: "Electronics"
 *                 photo: "http://example.com/electronics.jpg"
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized - Admin access required
 */

/**
 * @swagger
 * /category/{id}:
 *   patch:
 *     summary: Update category by ID
 *     tags: [Category]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The category ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 minLength: 3
 *                 maxLength: 55
 *               photo:
 *                 type: string
 *           examples:
 *             updateCategory:
 *               value:
 *                 name: "Updated Electronics"
 *                 photo: "http://example.com/updated-electronics.jpg"
 *     responses:
 *       200:
 *         description: Category updated successfully
 *         content:
 *           application/json:
 *             example:
 *               message: "Category updated successfully"
 *               category:
 *                 name: "Updated Electronics"
 *                 photo: "http://example.com/updated-electronics.jpg"
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized - Admin access required
 *       404:
 *         description: Category not found
 */

/**
 * @swagger
 * /category/{id}:
 *   delete:
 *     summary: Delete category by ID
 *     tags: [Category]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The category ID
 *     responses:
 *       204:
 *         description: Category deleted successfully
 *       401:
 *         description: Unauthorized - Admin access required
 *       404:
 *         description: Category not found
 */