const express = require('express')
const router = express.Router()
const { authenticateJWT, checkPermissions } = require('../middleware/authMiddleware');

const appController = require('../controllers/appController')

router.post('/', authenticateJWT, checkPermissions(["owner"]), appController.createApp)
router.get('/', authenticateJWT, checkPermissions(["owner", "editor"]), appController.listApps)

module.exports = router