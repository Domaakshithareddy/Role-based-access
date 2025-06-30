const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/authMiddleware');
const { allowRoles } = require('../middleware/checkRole');
const userCtl = require('../controllers/userController');

router.get('/dashboard',verifyToken,allowRoles('user','admin'),userCtl.dashboard);

module.exports=router;