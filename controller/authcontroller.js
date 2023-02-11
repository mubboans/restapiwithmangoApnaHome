const User =require('../model/user')

const jwt=require('jsonwebtoken')
function createtoken(data){
    let payload={userdetail:succ}
    let token =jwt.sign(payload,'secret')
}
const Login = (req,res)=>{
    User.findOne({username:req.body.username},(err,succ)=>{
        if(err){
            console.log(err,'err occur');
        }
        else{
            if(!succ){
                let data={status:"Invalid Username"}
                res.status(200).send(data);
            }
            else{
                if(succ.password !== req.body.password){
                    let data={status:"Invalid Password"}
                    res.status(200).send(data);    
                } 
                else{
                    let payload={username:succ.username,id:succ._id,email:succ.email,type:succ.type,user_role:succ.user_role}
                    let token =jwt.sign(payload,'secret')
                    res.status(200).send({token,username:succ.username,id:succ._id,email:succ.email,type:succ.type,user_role:succ.user_role});
                }
            }
    
        }
    
    })
}
const Register = (req,res)=>{
    let usersdata=req.body;
    console.log(usersdata,'user data');
    let userdataamodel =new User(usersdata);
    userdataamodel.save((err,register)=>{
        if(err)
        {
            console.log("eeror occured before Saving",err)
            let resposnes={
                resons:err,
                status:"failed"
            }
            res.status(500).send(resposnes)
        }
        else{
         
            let payload={staus:"Register Successfully"}

            res.status(200).send(payload); 
            // {
            //     "username": "mubbo123123",
            //     "password": "123",
            //     "confirmpassword": "123",
            //     "email": "123@gmail.com",
            //     "type": "buyer",
            //     "user_role":"2"
            // }
        }
    })
}
module.exports={
    login:Login,register:Register}