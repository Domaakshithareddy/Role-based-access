const jwt =require('jsonwebtoken');
const User=require('../models/User');

const requireAdmin=async(req,res,next)=>{
    try{
        const token=req.cookies.token;
        if (!token) return res.status(401).json({error:'Not authenticated'});
        const decoded=jwt.verify(token,process.env.JWT_TOKEN);
        const user=await User.findById(decoded.id);
        if (!user || user.role!=='admin'){
            return res.status(403).json({error:'Access denied, Admins only'})
        }
        req.user=user;
        next();
    }
    catch (err){
        res.status(401).json({error:'Invalid'});
    }
};

module.exports=requireAdmin;