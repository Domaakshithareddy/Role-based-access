const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/authMiddleware');
const { allowRoles } = require('../middleware/checkRole');
const adminCtl = require('../controllers/adminController');

router.get('/dashboard', verifyToken, allowRoles('admin'), adminCtl.dashboard);

module.exports = router;