const express = require('express')
const router = express.Router()
const { authenticateJWT, checkPermissions } = require('../middleware/authMiddleware');
var appController = require('../controllers/appController')

router.get('/auth', appController.generate)
router.post('/:appid', authenticateJWT(), checkPermissions(["owner", "editor"]), appController.createPass);
router.put('/:appid', authenticateJWT(), checkPermissions(["owner", "editor"]), appController.updatePass);
router.get('/:appid', authenticateJWT(), checkPermissions(["owner", "editor", "viewer"]), appController.getPass);


module.exports = router;