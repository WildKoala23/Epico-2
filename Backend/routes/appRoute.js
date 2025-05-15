const express = require('express')
const router = express.Router()
const { authenticateJWT, checkPermissions } = require('../middleware/authMiddleware');

const appController = require('../controllers/appController')

/**
 * @swagger
 * tags:
 *   name: Applications
 *   description: Endpoints for managing applications
 */

/**
 * @swagger
 * /app:
 *   post:
 *     summary: Create a new application
 *     tags: [Applications]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *                 example: My New App
 *               description:
 *                 type: string
 *                 example: This app handles payments.
 *     responses:
 *       201:
 *         description: Application created successfully
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 */
router.post('/', authenticateJWT(), appController.createApp);

/**
 * @swagger
 * /app:
 *   get:
 *     summary: List all applications
 *     tags: [Applications]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of applications
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     example: 12345
 *                   name:
 *                     type: string
 *                     example: My App
 *                   description:
 *                     type: string
 *                     example: A sample app
 *       401:
 *         description: Unauthorized
 */
router.get('/', authenticateJWT(), appController.listApps);

module.exports = router;


module.exports = router