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