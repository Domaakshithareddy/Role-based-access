const mongoose=require('mongoose');
const Course=require('../models/Course');

exports.createCourse=async (req,res) =>{
    try{
        const course=new Course(req.body);
        await course.save();
        res.status(201).json({message:"Course created successfully",course});
    }
    catch (err){
        console.error('Create course Error:',err);
        res.status(500).json({error:'Server error'});
    }
};

exports.getCourses=async (req,res)=>{
    try{
        const courses = await Course.find();
        res.json(courses);
    }
    catch (err){
        res.status(500).json({error:'Server error while fetching courses'});
    }
};

exports.getCourseById=async (req,res)=>{
    try{
        const {id}=req.params;
        if (!mongoose.Types.ObjectId.isValid(id)){
            return res.status(400).json({ message: "Invalid course ID" });
        }

        const course = await Course.findById(req.params.id);
        if (!course) return res.status(404).json({ message: "Course not found" });
        res.json(course);
    }
    catch (err){
        console.error("Get course by ID error:", err);
        res.status(500).json({ message: "Server error" });
    }
};