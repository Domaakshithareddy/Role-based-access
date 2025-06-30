const jwt=require('jsonwebtoken');

exports.createToken=(user)=>{
    return jwt.sign(
        {id:user._id, role:user.role},
        process.env.JWT_TOKEN,
        {expiresIn:process.env.JWT_EXPIRES || '1h'}
    );
};

exports.setTokenCookie=(res,token,remember)=>{
    res.cookie('token',token,{
        httpOnly:true,
        secure:process.env.NODE_ENV==='production',
        sameSite:'lax',
        maxAge:remember ? 7 * 24 * 60 * 60 * 1000 : undefined
    });
};

exports.clearTokenCookie=(res)=>res.clearCookie('token');