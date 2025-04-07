// docs/user.doc.js

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           minLength: 2
 *           maxLength: 55
 *         email:
 *           type: string
 *           format: email
 *         password:
 *           type: string
 *           minLength: 4
 *         role:
 *           type: string
 *           enum: ["USER", "ADMIN", "SUPER_ADMIN"]
 *         ipAddress:
 *           type: string
 */

/**
 * @swagger
 * /user/send-otp:
 *   post:
 *     summary: Send OTP to user
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *             required:
 *               - email
 *           examples:
 *             validEmail:
 *               value:
 *                 email: "user@example.com"
 *     responses:
 *       200:
 *         description: OTP sent successfully
 *         content:
 *           application/json:
 *             example:
 *               message: "OTP sent successfully"
 *       400:
 *         description: Invalid email format
 */

/**
 * @swagger
 * /user/verify-otp:
 *   post:
 *     summary: Verify OTP
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               otp:
 *                 type: string
 *                 minLength: 5
 *                 maxLength: 5
 *             required:
 *               - email
 *               - otp
 *           examples:
 *             validOtp:
 *               value:
 *                 email: "user@example.com"
 *                 otp: "12345"
 *     responses:
 *       200:
 *         description: OTP verified successfully
 *         content:
 *           application/json:
 *             example:
 *               message: "OTP verified successfully"
 *       400:
 *         description: Invalid OTP or email
 */

/**
 * @swagger
 * /user/register:
 *   post:
 *     summary: Register a new user
 *     tags: [User]
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
 *                 maxLength: 55
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *                 minLength: 4
 *               role:
 *                 type: string
 *                 enum: ["USER", "ADMIN"]
 *             required:
 *               - name
 *               - email
 *               - password
 *               - role
 *           examples:
 *             newUser:
 *               value:
 *                 name: "John Doe"
 *                 email: "john@example.com"
 *                 password: "password123"
 *                 role: "USER"
 *     responses:
 *       201:
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             example:
 *               message: "User registered successfully"
 *       400:
 *         description: Validation error
 */

/**
 * @swagger
 * /user/login:
 *   post:
 *     summary: Login user
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *                 minLength: 4
 *               ipAddress:
 *                 type: string
 *             required:
 *               - email rl
 *               - password
 *               - ipAddress
 *           examples:
 *             loginRequest:
 *               value:
 *                 email: "john@example.com"
 *                 password: "password123"
 *                 ipAddress: "192.168.1.1"
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             example:
 *               token: "jwt.token.here"
 *               message: "Login successful"
 *       401:
 *         description: Invalid credentials
 */

/**
 * @swagger
 * /user:
 *   get:
 *     summary: Get all users with pagination, sorting, and filtering
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
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
 *         name: contains
 *         schema:
 *           type: string
 *         description: Filter users by id or name (case-insensitive)
 *       - in: query
 *         name: column
 *         schema:
 *           type: string
 *           enum: [id, name]
 *           default: id
 *         description: Column to sort by
 *       - in: query
 *         name: order
 *         schema:
 *           type: string
 *           enum: [ASC, DESC]
 *           default: ASC
 *         description: Sort order (ascending or descending)
 *     responses:
 *       200:
 *         description: List of users with pagination
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       401:
 *         description: Unauthorized
 *
 *   post:
 *     summary: Create a new user (Admin or User)
 *     tags: [User]
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
 *                 maxLength: 55
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *                 minLength: 4
 *               role:
 *                 type: string
 *                 enum: ["USER", "ADMIN", "SUPER_ADMIN"]
 *             required:
 *               - name
 *               - email
 *               - password
 *               - role
 *           examples:
 *             createUser:
 *               value:
 *                 name: "Admin User"
 *                 email: "admin@example.com"
 *                 password: "admin123"
 *                 role: "ADMIN"
 *     responses:
 *       201:
 *         description: User created
 *         content:
 *           application/json:
 *             example:
 *               message: "User created successfully"
 *       401:
 *         description: Unauthorized - Admin access required
 */

/**
 * @swagger
 * /user/{id}:
 *   get:
 *     summary: Get user by ID
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The user ID
 *     responses:
 *       200:
 *         description: User details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: User not found
 *
 *   patch:
 *     summary: Update user by ID
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The user ID
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
 *                 maxLength: 55
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *                 minLength: 4
 *               role:
 *                 type: string
 *                 enum: ["USER", "ADMIN", "SUPER_ADMIN"]
 *           examples:
 *             updateUser:
 *               value:
 *                 name: "Updated Name"
 *                 email: "updated@example.com"
 *     responses:
 *       200:
 *         description: User updated
 *         content:
 *           application/json:
 *             example:
 *               message: "User updated successfully"
 *       401:
 *         description: Unauthorized
 *
 *   delete:
 *     summary: Delete user by ID
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The user ID
 *     responses:
 *       200:
 *         description: User deleted
 *         content:
 *           application/json:
 *             example:
 *               message: "User deleted successfully"
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: User not found
 */