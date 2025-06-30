exports.dashboard=(req,res)=>{
    res.json({
        message:`Welcome User ${req.user.id}`,
        role:req.user.role,
        info:'This is user-specific content.'
    });
};