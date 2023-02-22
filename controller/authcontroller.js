const User =require('../model/user')
const jwt=require('jsonwebtoken')
const {
    attachedTokens,
    randomPassword
  } =require('../utils/jwt')

const Login = (req,res)=>{
    User.findOne({username:req.body.username},(err,succ)=>{
        if(err){
            res.status(200).send({error:err});
        }
        else{
            if(!succ){
                // if(!req.body.username){
                //     res.status(403).send({error:"Password Required"}); 
                // }
                // else{
                    let data={status:"Invalid Username"}
                    res.status(200).send(data);
                // }
                
            }
            else{
                if(succ.password !== req.body.password){
                    // if(!req.body.password){
                    //     res.status(403).send({error:"Password Required"}); 
                    // }
                    // else{
                        let data={status:"Invalid Password"}
                        res.status(200).send(data);
                    // }
                        
                } 
                else{
                    console.log(req.body)
                    let payload={username:succ.username,id:succ._id,email:succ.email,type:succ.type,user_role:succ.user_role}
                    // let token =createtoken(payload)
                    const refreshToken = randomPassword();
                    var tok=attachedTokens({user:payload,refreshToken}) 
                    res.status(200).json({success: true,
                        error: "",
                        message: "Logged in successfully",
                        data:{
                            username:succ.username,id:succ._id,email:succ.email,type:succ.type,user_role:succ.user_role
                        }
                        ,...tok});
                }
            }
    
        }
    
    })
}
const Register = (req,res)=>{
    let usersdata=req.body;
    console.log(usersdata,'user data');
    let userdataamodel =new User(usersdata);
    User.find({username:usersdata.username}).exec(
        (err, obj) => {
            if(err){
               
            }
            else{
                console.log(typeof obj,'response',obj.length)

                if(obj.length <= 0){
                    userdataamodel.save((err,register)=>{
                        if(err)
                        {
                            
                            let resposnes={
                                resons:err,
                                status:"failed"
                            }
                            res.status(500).send(resposnes)
                        }
                        else{
                         
                            let payload={staus:"Register Successfully"}
                
                            res.status(200).send(payload); 
                        }
                    })
                }
                else{
                     res.status(500).send({status:"Useranme Already Exists Try With Different Name"})  
                }
            }
        })
   
}
module.exports={
    login:Login,register:Register}