"use client";
import useAuth from "../../hooks/useAuth";
import Navbar from "../../components/Navbar";

export default function UserDashboard(){
    const {user,loading}=useAuth("admin");
    if (loading) return <p>Loading...</p>;
    if (!user) return null;
    return (
        <>
            <Navbar />
            <section className="p-8">
                <h1 className="text-3xl font-bold">Admin Panel</h1>
                <p className="mt-4">Hello Admin {user.name},welcome back!</p>
                <h1 className="text-3xl font-bold">Controls listed below</h1>
            </section>
        </>
    )
}