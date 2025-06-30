const User=require('../models/User');
const {createToken,setTokenCookie,clearTokenCookie}=require('../utils/token');

exports.register=async (req,res)=>{
    const {name,email,password}=req.body;
    if (await User.findOne({email})){
        return res.status(409).json({message:'Email already registered'});
    }
    const user=await User.create({name,email,password});
    res.status(201).json({ message: 'User created', user: { id: user._id, email } });
};

exports.login=async (req,res)=>{
    const {email,password,remember}=req.body;
    const user=await User.findOne({email});
    if (!user || !(await user.comparePassword(password))){
        return res.status(400).json({ message: 'Invalid credentials' });
    }
    const token=createToken(user);
    setTokenCookie(res,token,remember);
    res.json({token,role:user.role,message:'Logged in'});
};

exports.verify = (req, res) => {
  res.json({ valid: true, user: req.user });
};

exports.logout=(req,res)=>{
    clearTokenCookie(res);
    res.json({message:'Logged out'});
};