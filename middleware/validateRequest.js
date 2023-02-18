const {status} = require('http-status-codes');
const validateRequestBody = (req,res,next)=>{

    if(Object.keys(req.body).length === 0){
        return res.status(403).json({
            success:false,
            error:"Authentication Failed",
            message:"Request body not find",
            data:null
        })  
    }
    else if(!req.body.username || !req.body.password){
        return res.status(403).json({
            success:false,
            error:"Validation Data Missing",
        }) 
    }
    else{
        next();
    }
   
}
module.exports= validateRequestBody;