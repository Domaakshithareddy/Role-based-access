import axios from "axios";

const api =axios.create({
    baseURL:process.env.NEXT_PUBLIC_API_URL,
    withCredentials:true,
    headers:{
        'Content-Type':'application/json',
    },
});

api.interceptors.request.use((config)=>{
    if (typeof window!=="undefined"){
        const token=localStorage.getItem("token") || sessionStorage.getItem("token");
        if (token) config.headers["Authorization"]=`Bearer ${token}`;
    }
    return config;
});

export default api;