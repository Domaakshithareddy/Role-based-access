const User=require('../models/User');

exports.getPendingAdminRequests=async (req,res)=>{
    try{
        const pendingUsers=await User.find({role:'user',adminRequestStatus: 'pending'}).select('-password');
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
        if (!user || user.role !=='user'){
            return res.status(404).json({message: 'User not found or already an admin'});
        }
        user.role='admin';
        user.adminRequestStatus = 'approved';
        await user.save();
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
        if (!user || user.role!=='user'){
            return res.status(404).json({message: 'User not found or already an admin'});
        }
        user.adminRequestStatus='rejected';
        await user.save();
        res.status(200).json({message: 'Admin request rejected'});
    }
    catch (err){
        console.error(err);
        res.status(500).json({message: 'Server error while rejecting request'});
    }
};