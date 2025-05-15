const express = require('express');
const router = express.Router();
const { authenticateJWT, checkPermissions } = require('../middleware/authMiddleware');
const appController = require('../controllers/appController');

/**
 * @swagger
 * tags:
 *   name: Passwords
 *   description: Endpoints for managing application passwords
 */

/**
 * @swagger
 * /passwords/auth:
 *   get:
 *     summary: Generate authentication token or credentials
 *     tags: [Passwords]
 *     responses:
 *       200:
 *         description: Auth credentials generated
 *       500:
 *         description: Server error
 */
router.get('/auth', appController.generate);

/**
 * @swagger
 * /passwords/{appid}:
 *   post:
 *     summary: Create a password entry for an app
 *     tags: [Passwords]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: appid
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: Application ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               key:
 *                 type: string
 *                 example: api-key
 *               value:
 *                 type: string
 *                 example: secret-value
 *     responses:
 *       201:
 *         description: Password created
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 */
router.post('/:appid', authenticateJWT(), checkPermissions(["owner", "editor"]), appController.createPass);

/**
 * @swagger
 * /passwords/{appid}:
 *   put:
 *     summary: Update a password entry for an app
 *     tags: [Passwords]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: appid
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: Application ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               key:
 *                 type: string
 *                 example: api-key
 *               value:
 *                 type: string
 *                 example: new-secret-value
 *     responses:
 *       200:
 *         description: Password updated
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 */
router.put('/:appid', authenticateJWT(), checkPermissions(["owner", "editor"]), appController.updatePass);

/**
 * @swagger
 * /passwords/{appid}:
 *   get:
 *     summary: Retrieve password data for an app
 *     tags: [Passwords]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: appid
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: Application ID
 *     responses:
 *       200:
 *         description: Password data retrieved
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               example:
 *                 key: api-key
 *                 value: secret-value
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 */
router.get('/:appid', authenticateJWT(), checkPermissions(["owner", "editor", "viewer"]), appController.getPass);

module.exports = router;
