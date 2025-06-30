const express=require('express');
const router=express.Router();
const authCtl = require('../controllers/authController');
const {verifyToken}=require('../middleware/authMiddleware');

router.post('/register',authCtl.register);
router.post('/login',authCtl.login);
router.get('/verify',verifyToken,authCtl.verify);
router.post('/logout',authCtl.logout);

module.exports=router;