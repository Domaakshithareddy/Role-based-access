import axios from 'axios';

const API_BASE=process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000.api";

export const createCourse=(data)=> axios.post(`${API_BASE}/courses`,data,{withCredentials:true});

export const getCourses=(data)=> axios.get(`${API_BASE}/courses`,{withCredentials:true});