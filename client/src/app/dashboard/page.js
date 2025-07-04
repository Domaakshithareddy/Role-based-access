"use client";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import { getCourses } from "../../services/courseService";
import CourseCard from "../../components/CourseCard";
import Navbar from "../../components/Navbar";
import Link from "next/link";

export default function UserDashboard(){
    const {user,loading:authLoading}=useAuth();
    const [courses,setCourses]=useState([]);
    const [loading,setLoading]=useState(true);
    useEffect(()=>{
        const load=async ()=>{
            try{
                const res=await getCourses();
                setCourses(res.data);
            }
            catch (err){
                console.error('fetch courses error:',err?.response?.data || err);
            }
            finally{
                setLoading(false);
            }
        };
        load();
    },[]);
    if (authLoading || loading) return <p className="p-6">Loading...</p>;
    if (!user) return null;
    return (
        <>
            <Navbar />
            <section className="p-6">
                <h1 className="text-3xl font-bold mb-6">Available Courses</h1>

                {courses.length === 0 ? (
                    <p>No courses added yet.</p>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {courses.map((course) => (
                            <Link key={course._id} href={`/dashboard/${course._id}`}>
                                <CourseCard key={course._id} course={course} />
                            </Link>
                    ))}
                    </div>
                )}
            </section>
        </>
    )
}