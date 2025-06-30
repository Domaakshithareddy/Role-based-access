exports.dashboard=(req,res)=>{
    res.json({
        message: `Welcome Admin ${req.user.id}`,
        role: req.user.role,
        info: 'This is sensitive admin data.'
    })
}