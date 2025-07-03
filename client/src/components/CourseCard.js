"use client";
import Image from "next/image";

const CourseCard=({course})=>{
    return (
        <div className="border rounded shadow p-4 bg-white">
            {course.imgSrc && (
                <Image src={course.imgSrc} alt={course.title} width={400} height={160} className="w-full h-40 object-cover rounded" />
            )}
            <h2 className="text-lg font-semibold mt-2">{course.title}</h2>
            <p className="text-sm text-gray-600">{course.description}</p>
            <p className="text-xs text-gray-500 mt-1">{course.duration}</p>
        </div>
    );
};

export default CourseCard;