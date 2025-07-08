const express = require('express');
const router = express.Router();

const {getPendingAdminRequests,approveAdminRequest,rejectAdminRequest}=require('../controllers/superAdminController');
const {verifyToken}=require('../middleware/authMiddleware');
const {allowRoles}=require('../middleware/checkRole');

router.get('/pending-requests',verifyToken,allowRoles('superAdmin'),getPendingAdminRequests);
router.post('/approve/:id',verifyToken,allowRoles('superAdmin'),approveAdminRequest);
router.post('/reject/:id',verifyToken,allowRoles('superAdmin'),rejectAdminRequest);

module.exports=router;