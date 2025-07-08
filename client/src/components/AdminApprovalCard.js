export default function AdminApprovalCard({user,onApprove,onReject}) {
    return(
        <div className="border p-4 rounded shadow mb-4 flex justify-between items-center">
            <div>
                <p className="text-lg font-semibold">{user.name}</p>
                <p className="text-sm text-gray-600">{user.email}</p>
            </div>
            <div className="space-x-2">
                <button onClick={()=>onApprove(user._id)} className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700">Approve</button>
                <button onClick={()=>onReject(user._id)} className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700">Reject</button>
            </div>
        </div>
    )
}