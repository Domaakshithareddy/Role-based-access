"use client";
import {useState} from "react";

const CourseForm=({onSubmit})=>{
    const [course,setCourse]=useState({
        title: "",
        imgSrc: "",
        duration: "",
        description: "",
        category: "",
        modules: [
            {
                title: "",
                duration: "",
                completed: false,
                subtopics: [""],
                lessons: [
                    {
                        title: "",
                        duration: "",
                        completed: false,
                    },
                ],
            },
        ],
    });

    const [showConfirm, setShowConfirm] = useState(false);

    const handleCourseChange=(e)=>{
        setCourse({...course,[e.target.name]:e.target.value});
    };

    const handleModuleChange=(idx,field,value)=>{
        const mods=[...course.modules];
        mods[idx][field]=value;
        setCourse({...course,modules:mods});
    };

    const handleLessonChange=(mIdx,lIdx,field,value)=>{
        const mods=[...course.modules];
        mods[mIdx].lessons[lIdx][field]=value;
        setCourse({...course, modules:mods});
    };

    const handleSubtopicChange=(mIdx,sIdx,value)=>{
        const updatedModules=[...course.modules];
        updatedModules[mIdx].subtopics[sIdx]=value;
        setCourse({...course, modules:updatedModules});
    };

    const addModule=()=>{
        setCourse({
            ...course,
            modules:[
                ...course.modules,
                {
                    title:'',
                    duration:'',
                    completed:false,
                    subtopics:[''],
                    lessons:[
                        {
                            title:'',
                            duration:'',
                            completed:false,
                        },
                    ],
                },
            ],
        });
    };

    const handleConfirmSubmit=()=>{
        setShowConfirm(false);
        onSubmit(course)
    };

    const handleCancel=()=>{
        setShowConfirm(false);
    };

    const addLesson=(mIdx)=>{
        const mods=[...course.modules];
        mods[mIdx].lessons.push({title:'',duration:'',completed:false});
        setCourse({...course,modules:mods});
    };

    const deleteLesson=(mIdx,lIdx)=>{
        const mods=[...course.modules];
        mods[mIdx].lessons.splice(lIdx,1);
        setCourse({...course,modules:mods});
    };

    const deleteModule=(mIdx)=>{
        const mods=[...course.modules];
        mods.splice(mIdx,1);
        setCourse({...course,modules:mods});
    };

    const addSubtopic=(mIdx)=>{
        const mods=[...course.modules];
        mods[mIdx].subtopics.push("");
        setCourse({...course,modules:mods});
    };

    const deleteSubtopic=(mIdx,sIdx)=>{
        const mods=[...course.modules];
        mods[mIdx].subtopics.splice(sIdx,1);
        setCourse({...course,modules:mods});
    };

    const submitHandler=(e)=>{
        e.preventDefault();
        setShowConfirm(true);
    };

    return (
        <form onSubmit={submitHandler} className="space-y-6 bg-white p-6 rounded-lg shadow max-w-3xl mx-auto">
            <h1 className="text-2xl font-bold mb-4 text-black">New Course Details</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-black">
                <input name="title" value={course.title || ""} onChange={handleCourseChange} placeholder="Course Title" className="input border p-2 rounded" />
                <input name="imgSrc" value={course.imgSrc || ""} onChange={handleCourseChange} placeholder="Image Url/path" className="input border p-2 rounded" />
                <input name="duration" value={course.duration || ""} onChange={handleCourseChange} placeholder="Total Duration" className="input border p-2 rounded" />
                <input name="category" value={course.category || ""} onChange={handleCourseChange} placeholder="Category" className="input border p-2 rounded" />
            </div>
            <textarea name="description" value={course.description || ""} onChange={handleCourseChange} placeholder="Description" className="w-full border p-2 rounded text-black" />

            <h1 className="text-xl font-bold mb-4 text-black">Modules</h1>
            {course.modules.map((mod,mIdx)=>(
                <div key={mIdx} className="border rounded p-4 bg-gray-50 space-y-3">
                    <div className="flex justify-between items-center mb-2">
                        <h3 className="font-semibold mb-2 text-black">Module {mIdx+1}</h3>
                        <button type="button" onClick={()=> deleteModule(mIdx)} className="text-red-600 text-sm hover:underline" title="Delete Module">🗑</button>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-black">
                        <input value={mod.title || ""} onChange={(e)=>handleModuleChange(mIdx,'title',e.target.value)} placeholder="Module Title" className="input border p-2 rounded" />
                        <input value={mod.duration || ""} onChange={(e)=>handleModuleChange(mIdx,'duration',e.target.value)} placeholder="Duration" className="input border p-2 rounded" />
                    </div>

                    <h4 className="text-sm font-medium mt-2 text-black">Subtopics</h4>
                    <div className="flex flex-wrap gap-2">
                        {mod.subtopics.map((sub,sIdx)=>(
                            <div key={sIdx} className="flex items-center gap-1 bg-white border rounded px-2 py-1 text-black">
                                <input key={sIdx} value={sub || ""} onChange={(e)=>handleSubtopicChange(mIdx,sIdx,e.target.value)} placeholder="Subtopic" className="input text-sm px-1 py-0.5 w-40 outline-none" />
                                <button type="button" onClick={()=>deleteSubtopic(mIdx,sIdx)} className="text-red-500 text-sm hover:text-red-700">X</button>
                            </div>
                        ))}
                    </div>
                    <button type="button" onClick={()=>addSubtopic(mIdx)} className="text-blue-600 text-sm hover:underline">+ Add Subtopic</button>

                    <h4 className="text-sm font-medium text-black">Lessons</h4>
                    {mod.lessons.map((lesson,lIdx)=>(
                        <div key={lIdx} className="flex gap-2 items-center ml-4 mb-2 text-black">
                            <input value={lesson.title || ""} onChange={(e)=>handleLessonChange(mIdx,lIdx,'title',e.target.value)} placeholder="Lesson Title" className="flex-1 border p-2 rounded" />
                            <input value={lesson.duration || ""} onChange={(e)=>handleLessonChange(mIdx,lIdx,'duration',e.target.value)} placeholder="Duration" className="w-40 border p-2 rounded" />
                            <button type="button" onClick={()=> deleteLesson(mIdx,lIdx)} className="w-11 border p-2 rounded" title="Delete Lesson">❌</button>
                        </div>
                    ))}
                    <button type="button" onClick={()=>addLesson(mIdx)} className="text-blue-600 text-sm hover:underline">+ Add Lesson</button>
                </div>
            ))}
            <div className="flex gap-4">
                <button type="button" onClick={addModule} className="text-blue-600">+ Add Module</button>
            </div>
            <div className="flex gap-4">
                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded ml-4">Submit</button>
            </div>
            {showConfirm && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white rounded-lg shadow-lg p-6 w-80 text-black">
                        <h2 className="text-xl font-semibold mb-4">Confirm Submission</h2>
                        <p className="mb-6">Are you sure you want to submit this course?</p>
                        <div className="flex justify-end gap-4">
                            <button onClick={handleCancel} className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded">Cancel</button>
                            <button onClick={handleConfirmSubmit} className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded">Confirm</button>
                        </div>
                    </div>
                </div>
            )}
        </form>
    );
};

export default CourseForm;