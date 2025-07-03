const express=require('express');
const router=express.Router();
const {createCourse,getCourses}=require('../controllers/courseController');
const requireAdmin=require('../middleware/requireAdmin');

router.post('/',requireAdmin,createCourse);
router.get('/',getCourses);

module.exports=router;