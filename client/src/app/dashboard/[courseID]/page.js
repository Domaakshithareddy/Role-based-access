"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import api from "../../../lib/api";
import Navbar from "../../../components/Navbar";

export default function CourseDetailsPage(){
    const [course,setCourse]=useState(null);
    const [expandedModule,setExpandedModule]=useState(null);
    const params = useParams();
    const courseId = params?.courseID;  

    useEffect(()=>{
        const fetchCourse=async ()=>{
            try{
                console.log("Fetching course with ID:", courseId);
                const res=await api.get(`/courses/${courseId}`);
                setCourse(res.data);
            }
            catch (err){
                console.error("failed to fetch course",err?.response?.data || err);
            }
        };
        fetchCourse();
    },[courseId]);

    const toggleModule=(index)=>{
        setExpandedModule((prev)=>(prev===index ? null:index));
    };
    if (!course) return <p>Loading...</p>;

    return (
        <>
        <Navbar />
        <div className="p-6 bg-white text-black max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-4">{course.title}</h1>
            <p className="mb-2">{course.descriiption}</p>
            <p className="text-sm text-gray-600 mb-4">Category: {course.category}</p>

            <h2 className="text-xl font-semibold mb-3">Modules</h2>
            <div className="space-y-3">
                {course.modules.map((mod,idx)=>(
                    <div key={idx} className="border p-4 rounded bg-gray-50">
                        <div className="flex justify-between items-center cursor-pointer" onClick={()=>toggleModule(idx)}>
                            <h3 className="text-lg font-medium">{mod.title}-{mod.duration}</h3>
                            <span className="text-blue-600">{expandedModule === idx ? "▲" : "▼"}</span>
                        </div>
                        {expandedModule===idx && (
                            <div className="mt-2 ml-4">
                                <p className="text-sm text-gray-700">
                                    <span className="font-semibold">Subtopics:</span> {mod.subtopics.join(', ')}
                                </p>

                                <h4 className="font-semibold mb-1">Lessons:</h4>
                                <ul className="list-disc ml-5">
                                    {mod.lessons?.map((lesson,i)=>(
                                        <li key={i}>
                                            {lesson.title}-{lesson.duration}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
        </>
    );
}