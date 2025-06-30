"use client";
import { useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import { AuthContext } from "../context/AuthContext";

export default function useAuth(requiredRole=null){
    const {user,loading,syncUser}=useContext(AuthContext);
    const router=useRouter();
    useEffect(()=>{
        if (!loading){
            if (!user){
                router.replace("/");
            }
            else if (requiredRole && user.role!==requiredRole){
                router.replace("/");
            }
        }
    },[user,loading,requiredRole,router]);
    return {user,loading,syncUser};
}