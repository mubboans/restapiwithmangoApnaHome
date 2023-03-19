const { isTokenValid } =require('../utils/jwt')
const User = require('../model/user')
const verifyUserToken = async (req,res,next)=>{
    let token;
    const authHeader = req.headers.authorization;
    if(authHeader && authHeader.startsWith("Bearer")){
        token = authHeader.split(" ")[1];
    }
    if(!token){
        res.send({status:"Authorization Failed"})
    }
    try{ 
         const head= isTokenValid(token);
            if(head.user){
                next();
            }
            else{
                res.status(401).send({mesagge:"Token expire please relogin",success:false})
            }
 
        }
    catch(error){

        res.send({status:"Failed To Authenticate",error:error})
    }

}
module.exports = verifyUserToken
