const mongoose=require('mongoose');

const lessonSchema=new mongoose.Schema({
    title:{type:String, required:true},
    duration:{type:String, required:true},
    completed:{type:Boolean, default:false},
},{_id:false});

const moduleSchema=new mongoose.Schema({
    title:{type:String, required:true},
    duration:{type:String, required:true},
    completed:{type:Boolean, default:false},
    subtopics:[{type:String}],
    lessons:[lessonSchema],
},{_id:false});

const courseSchema=new mongoose.Schema({
    title:{type:String, required:true},
    imgSrc:{type:String},
    duration:{type:String},
    description:{type:String},
    category:{type:String},
    modules:[moduleSchema],
},{timestamps:true});

module.exports=mongoose.model('Course',courseSchema);