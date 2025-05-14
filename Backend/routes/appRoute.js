const express = require('express')
const router = express.Router()
const { authenticateJWT, checkPermissions } = require('../middleware/authMiddleware');

const appController = require('../controllers/appController')

router.post('/', authenticateJWT(), appController.createApp)
router.get('/', authenticateJWT(), appController.listApps)

module.exports = router