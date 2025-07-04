const express=require('express');
const router=express.Router();
const {createCourse,getCourses, getCourseById}=require('../controllers/courseController');
const requireAdmin=require('../middleware/requireAdmin');

router.post('/',requireAdmin,createCourse);
router.get('/',getCourses);
router.get('/:id',getCourseById);

module.exports=router;