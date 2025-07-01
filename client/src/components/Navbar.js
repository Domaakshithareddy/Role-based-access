"use client";
import Link from "next/link";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Navbar(){
    const {user,handleLogout}=useContext(AuthContext);
    return (
        <nav className="w-full bg-blue-400 shadow p-4 flex justify-between items-center">
            <span className="font-semibold">OptGrad</span>
            {user && (
                <div className="space-x-4">
                    <Link href="/dashboard" className="text-blue-600 underline">Dashboard</Link>
                    {user.role==="admin" && <Link href="/admin-panel">Admin Controls</Link>}
                    <button onClick={handleLogout} className="text-red-600 underline">
                        Logout
                    </button>
                </div>
            )}
        </nav>
    );
}