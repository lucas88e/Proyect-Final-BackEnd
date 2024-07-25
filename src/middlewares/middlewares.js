const jwt = require("jsonwebtoken")
const hashedSecret = require("../config/crypto.js")

function generateToken(user){
    return jwt.sign({user:user.id},hashedSecret,{expiresIn:"1h"})
}

function verifyToken(req,res,next){
    const token = req.session.token;
    if(!token){
        return res.status(401).json({mensaje:"Token not generate succesfull"})
    }
    jwt.verify(token,hashedSecret,(err,decoded)=>{
        if(err){
            return res.status(401).json({message: "Token not valid"})
        }
        req.user = decoded.user;
        next()
    })
}
module.exports = {generateToken,verifyToken}