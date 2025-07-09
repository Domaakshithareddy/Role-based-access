"use client"
import { useState } from "react"

export default function AdminApprovalCard({user,onApprove,onReject}) {
    const [showApprovePopup,setShowApprovePopup]=useState(false);
    const [showRejectPopup,setShowRejectPopup]=useState(false);

    const handleApproveConfirm=()=>{
        onApprove(user._id);
        setShowApprovePopup(false);
    };

    const handleRejectConfirm=()=>{
        onReject(user._id);
        setShowRejectPopup(false);
    };

    return(
        <>
            <div className="border p-4 rounded shadow mb-4 flex justify-between items-center">
                <div>
                    <p className="text-lg font-semibold">{user.name}</p>
                    <p className="text-sm">{user.email}</p>
                </div>
                <div className="space-x-2">
                    <button onClick={()=>setShowApprovePopup(true)} className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700">Approve</button>
                    <button onClick={()=>setShowRejectPopup(true)} className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700">Reject</button>
                </div>
            </div>

            {showApprovePopup && (
                <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white rounded-lg shadow-lg p-6 w-80 text-black">
                        <h2 className="text-xl font-semibold mb-4 text-green-700">Approve Request</h2>
                        <p className="mb-6">Are you sure you want to approve <strong>{user.name}</strong> as an admin?</p>
                        <div className="flex justify-end gap-4">
                            <button onClick={()=>setShowApprovePopup(false)} className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded">Cancel</button>
                            <button onClick={handleApproveConfirm} className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded">Confirm</button>
                        </div>
                    </div>
                </div>
            )}

            {showRejectPopup && (
                <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white rounded-lg shadow-lg p-6 w-80 text-black">
                        <h2 className="text-xl font-semibold mb-4 text-red-700">Reject Request</h2>
                        <p className="mb-6">Are you sure you want to reject request by <strong>{user.name}</strong>?</p>
                        <div className="flex justify-end gap-4">
                            <button onClick={()=>setShowRejectPopup(false)} className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded">Cancel</button>
                            <button onClick={handleRejectConfirm} className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded">Confirm</button>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}