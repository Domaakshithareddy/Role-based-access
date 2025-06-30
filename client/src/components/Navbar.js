"use client";
import Link from "next/link";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Navbar(){
    const {user,handleLogout}=useContext(AuthContext);
    return (
        <nav className="w-full bg-white shadow p-4 flex justify-between">
            <span className="font-semibold">RBAC App</span>
            {user && (
                <div className="space-x-4">
                    {user.role==="admin" && <Link href="/admin/dashboard">Admin</Link>}
                    <Link href="/user/dashboard">User</Link>
                    <button onClick={handleLogout} className="text-red-600 underline">
                        Logout
                    </button>
                </div>
            )}
        </nav>
    );
}