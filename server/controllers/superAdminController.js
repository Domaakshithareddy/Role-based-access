const User=require('../models/User');
const sendApprovalStatusMail=require('../utils/sendApprovalStatusMail');

exports.getPendingAdminRequests=async (req,res)=>{
    try{
        const pendingUsers=await User.find({adminRequestStatus: 'pending'});
        res.status(200).json(pendingUsers);
    }
    catch (err){
        console.error(err);
        res.status(500).json({ message: 'Server error while fetching requests' });
    }
};

exports.approveAdminRequest=async (req,res) =>{
    try{
        const user=await User.findById(req.params.id);
        if (!user || user.adminRequestStatus !== 'pending'){
            return res.status(404).json({message: 'User not found or already an admin'});
        }
        user.role='admin';
        user.adminRequestStatus = 'approved';
        await user.save();

        await sendApprovalStatusMail({
            name:user.name,
            email:user.email,
            status:'approved'
        });

        res.status(200).json({message: 'User promoted to admin'});
    }
    catch (err){
        console.error(err);
        res.status(500).json({message: 'Server error while approving request'});
    }
};

exports.rejectAdminRequest=async (req,res)=>{
    try{
        const user=await User.findById(req.params.id);
        if (!user || user.adminRequestStatus !== 'pending'){
            return res.status(404).json({message: 'User not found or already an admin'});
        }
        user.adminRequestStatus='rejected';
        await user.save();

        await sendApprovalStatusMail({
            name:user.name,
            email:user.email,
            status:'rejected'
        });

        res.status(200).json({message: 'Admin request rejected'});
    }
    catch (err){
        console.error(err);
        res.status(500).json({message: 'Server error while rejecting request'});
    }
};