const express = require('express')
const router = express.Router()
const {authenticateJWT, checkAppPermission } = require('../middleware/authMiddleware');
var appController = require('../controllers/appController')

router.get('auth', appController.generate)
router.post('/:appid', authenticateJWT, checkAppPermission, appController.createPass);
router.put('/:appid', authenticateJWT, checkAppPermission, appController.updatePass);
router.get('/:appid', authenticateJWT, checkAppPermission, appController.getPass);


module.exports = router;