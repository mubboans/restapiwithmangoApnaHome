const User =require('../model/user')
const jwt=require('jsonwebtoken')
const {
    attachedTokens,
    randomPassword
  } =require('../utils/jwt')

const Login = (req,res)=>{
    // console.log('login hit');
    User.findOne({username:req.body.username},(err,succ)=>{
        if(err){
            res.status(400).send({message:'Login Failed',success:false,error:err});
        }
        else{
            if(!succ){
                // if(!req.body.username){
                //     res.status(403).send({error:"Password Required"}); 
                // }
                // else{
                    let data={status:"Invalid Username",success:false}
                    res.status(400).send(data);
                // }
                
            }
            else{
                if(succ.password !== req.body.password){
                    // if(!req.body.password){
                    //     res.status(403).send({error:"Password Required"}); 
                    // }
                    // else{
                        let data={status:"Invalid Password",success:false}
                        res.status(400).send(data);
                    // }
                        
                } 
                else{
                    console.log(req.body)
                    let payload={username:succ.username,id:succ._id,email:succ.email,type:succ.type,user_role:succ.user_role}
                    // let token =createtoken(payload)
                    const refreshToken = randomPassword();
                    var tok=attachedTokens({user:payload}) 
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
                let resposnes={
                    error:err,success:false,
                    status:"Failed to register"
                }  
              return res.status(400).send(resposnes)
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
                            return   res.status(400).send(resposnes)
                        }
                        else{
                         
                            let payload={status:"Register Successfully",succes:true}
                
                            return  res.status(200).send(payload); 
                        }
                    })
                }
                else{
                    return res.status(400).send({status:"Useranme Already Exists Try With Different Name",success:false})  
                }
            }
        })
   
}
module.exports={
    login:Login,register:Register}