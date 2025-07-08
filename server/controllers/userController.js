const User=require('../models/User');

exports.dashboard=(req,res)=>{
    res.json({
        message:`Welcome User ${req.user.id}`,
        role:req.user.role,
        info:'This is user-specific content.'
    });
};

exports.requestAdminAccess=async (req,res)=>{
    try{
        const user=await User.findById(req.user.id);
        if (!user){
            return res.status(404).json({message:'User not found'});
        }
        if (user.role!=='user'){
            return res.status(400).json({ message: 'Only users can request admin access' });
        }
        if (user.adminRequestStatus==='pending'){
            return res.status(400).json({ message: 'Admin access request already pending' });
        }
        if (user.adminRequestStatus==='rejected'){
            return res.status(400).json({ message: 'Your request was rejected' });
        }
        user.adminRequestStatus='pending';
        await user.save();

        return res.status(200).json({message: 'Admin access request submitted successfully'});
    }
    catch (err){
        console.error(err);
        return res.status(500).json({ message: 'Server error' });
    }
};