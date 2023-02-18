const { isTokenValid } =require('../utils/jwt')
const User = require('../model/user')
const verifyUserToken = async (req,res,next)=>{
    let token;
    const authHeader = req.headers.authorization;
    console.log(authHeader,'Header');
    if(authHeader && authHeader.startsWith("Bearer")){
        token = authHeader.split(" ")[1];
    }
    if(!token){
        res.send({status:"Authorization Failed"})
    }
    try{ 
         const head= isTokenValid(token);
        console.log(head,'check');
            if(head.user){
                next();
            }
            else{
                res.status(403).send({mesagge:"User not verify"})
            }
 
        }
    catch(error){

        res.send({status:"Failed To Authenticate",error:error})
    }

}
module.exports = verifyUserToken
