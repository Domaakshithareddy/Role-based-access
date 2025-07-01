"use client";
import useAuth from "../../hooks/useAuth";
import Navbar from "../../components/Navbar";

export default function UserDashboard(){
    const {user,loading}=useAuth();
    if (loading) return <p>Loading...</p>;
    if (!user) return null;
    return (
        <>
            <Navbar />
            <section className="p-8">
                <h1 className="text-3xl font-bold">Dashboard</h1>
                <p className="mt-4">Hello {user.name},welcome back!</p>
                <p className="mt-2">Your role is: <strong>{user.role}</strong></p>
            </section>
        </>
    )
}