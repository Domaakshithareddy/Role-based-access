import { useEffect,useState } from "react";
import api from '../lib/api';

export default function useAdminRequests() {
    const [requests,setRequests]=useState([]);
    const [loading,setLoading]=useState(true);

    const featchRequests=async ()=>{
        try {
            const res =await api.get('/super-admin/pending-requests');
            setRequests(res.data);
        }
        catch (err){
            console.error('Error fetching requests:',err);
        }
        finally{
            setLoading(false);
        }
    };

    const approve=async (userId)=>{
        await api.post(`/super-admin/approve/${userId}`);
        setRequests(prev=>prev.filter(r=>r._id!==userId));
    };

    const reject=async (userId)=>{
        await api.post(`/super-admin/reject/${userId}`);
        setRequests(prev=>prev.filter(r=>r._id!==userId));
    };

    useEffect(()=>{
        featchRequests();
    },[]);

    return {requests,loading,approve,reject};
}