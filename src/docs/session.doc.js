// docs/session.doc.js

/**
 * @swagger
 * tags:
 *   name: Session
 *   description: Session management APIs
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Session:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: The session ID
 *         userId:
 *           type: string
 *           description: The ID of the user associated with the session
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: When the session was created
 */

/**
 * @swagger
 * /sessions:
 *   get:
 *     summary: Get all sessions for the authenticated user
 *     tags: [Session]
 *     security:
 *       - bearerAuth: []
 *     description: Requires a valid JWT token with role USER, ADMIN, or SUPER_ADMIN
 *     responses:
 *       200:
 *         description: List of user sessions
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Session'
 *             example:
 *               - id: "session1"
 *                 userId: "user123"
 *                 createdAt: "2025-04-07T10:00:00Z"
 *               - id: "session2"
 *                 userId: "user123"
 *                 createdAt: "2025-04-07T11:00:00Z"
 *       401:
 *         description: Unauthorized - Token missing or invalid
 *       403:
 *         description: Forbidden - Insufficient role permissions (requires USER, ADMIN, or SUPER_ADMIN)
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /sessions/{id}:
 *   delete:
 *     summary: Delete a session by ID
 *     tags: [Session]
 *     security:
 *       - bearerAuth: []
 *     description: Requires a valid JWT token with role USER, ADMIN, or SUPER_ADMIN
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The session ID to delete
 *     responses:
 *       200:
 *         description: Session deleted successfully
 *         content:
 *           application/json:
 *             example:
 *               message: "Session deleted successfully"
 *       401:
 *         description: Unauthorized - Token missing or invalid
 *       403:
 *         description: Forbidden - Insufficient role permissions (requires USER, ADMIN, or SUPER_ADMIN)
 *       404:
 *         description: Session not found
 *       500:
 *         description: Server error
 */