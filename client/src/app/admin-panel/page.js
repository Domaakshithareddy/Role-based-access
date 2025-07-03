"use client";

import { useRouter } from "next/navigation";
import CourseForm from "../../components/CourseForm";
import Navbar from "../../components/Navbar";
import { createCourse } from "../../services/courseService";
import useAuth from "../../hooks/useAuth";
import { useEffect } from "react";

const AddCoursePage=()=>{
    const router=useRouter();
    const {user,loading}=useAuth();

    useEffect(()=>{
        if (!loading && (!user || user.role!=='admin')){
            router.replace('/dashboard');
        }
    },[user,loading,router]);

    const handleSubmit=async (data)=>{
        try{
            await createCourse(data);
            alert('Course Created!');
            router.push('/dashboard');
        }
        catch (err){
            alert('Failes to create course');
        }
    };
    if (loading) return <p>Loading...</p>;
    if (!user || user.role!=='admin') return null;

    return (
        <>
            <Navbar />
            <div className="max-w-3xl mx-auto p-6 bg-blue-200">
                <h1 className="text-2xl font-bold mb-4 text-black text-center">Add New Course</h1>
                <CourseForm onSubmit={handleSubmit} />
            </div>
        </>
    );
};

export default AddCoursePage;