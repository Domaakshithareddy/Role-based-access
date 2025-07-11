"use client";
import AuthForm from "../components/AuthForm";
import { useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import { AuthContext } from "../context/AuthContext";

export default function Home() {
  const {user,loading}=useContext(AuthContext);
  const router=useRouter();
  useEffect(()=>{
    if (!loading && user){
      router.replace('/dashboard');
    }
  },[user,loading,router]);
  return (
    <main className="min-h-screen flex items-center justify-center">
      <AuthForm/>
    </main>
  )
}