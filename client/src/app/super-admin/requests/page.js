"use client"

import useAdminRequests from "../../../hooks/useAdminRequests";
import AdminApprovalCard from "../../../components/AdminApprovalCard";
import Navbar from "../../../components/Navbar";

export default function AdminRequestsPage(){
    const {requests,loading,approve,reject}=useAdminRequests();

    return (
        <>
            <Navbar />
            <div className="max-w-2xl mx-auto mt-10 px-4">
                <h1 className="text-2xl font-bold mb-6 text-center">Pending Admin Requests</h1>
                {loading ? (
                    <p className="text-center">Loading...</p>
                ) : requests.length===0 ? (
                    <p className="text-center text-gray-500">No pending requests.</p>
                ) : (
                    requests.map((user)=>(
                        <AdminApprovalCard
                            key={user._id}
                            user={user}
                            onApprove={approve}
                            onReject={reject}
                        />
                    ))
                )}
            </div>
        </>
    )
}