"use client";
import { useContext,useEffect } from "react";
import { useRouter } from "next/navigation";
import { AuthContext } from "../../context/AuthContext";

export default function LogoutPage(){
    const {handleLogout}=useContext(AuthContext);
    const router=useRouter();
    useEffect(()=>{
        handleLogout();
        router.replace("/");
    },[handleLogout,router]);
    return null;
}