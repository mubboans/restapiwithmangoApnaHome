const { isTokenValid } =require('../utils/jwt')
const User = require('../model/user')
const verifyUserToken = async (req,res,next)=>{
    let token;
    const authHeader = req.headers.authorization;
    if(authHeader && authHeader.startsWith("Bearer")){
        token = authHeader.split(" ")[1];
    }
    if(!token){
        res.status(404).send({message:"Request is without token",status:"Token not found",success:false})
    }
    try{ 
         const head= isTokenValid(token);
            if(head.user){
                next();
            }
            else{
                res.status(401).send({message:"Token is valid",success:false,status:"invalid token"})
            }
   
        }
    catch(error){
        res.status(401).send({message:'failed to authenticate',status:"invalid token",error:error,success:false})
    }

}
module.exports = verifyUserToken
