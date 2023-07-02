const User =require('../model/user')
const jwt=require('jsonwebtoken')

function generateRandomFourDigitNumber() {
  const min = 1000;
  const max = 9999;
  return Math.floor(Math.random() * (max - min + 1) + min);
}

const {
    attachedTokens,
    randomPassword,
    isTokenValid
  } =require('../utils/jwt')

const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()-_=+[{]}\\|;:'\",.<>/?";
function generatePassword(length) {
  const password = [];
  for (let i = 0; i < length; i++) {
    password.push(characters[Math.floor(Math.random() * characters.length)]);
  }
  return password.join("");
}
const refreshToken = async (req, res,next) => {
    let reqbody = req.body;
    let token = isTokenValid(reqbody.token);
    if(token || token.user) {
        console.log(token);
        res.send({message:"Token Referesh Succesfully", token: token})
}
else{
    
}
}
const Login =async (req,res,next)=>{
    User.findOne({$or:[{username:req.body.username},{email:req.body.username}]},(err,succ)=>{
        if(err){
            res.status(400).send({message:'Login Failed',success:false,error:err});
        }
        else{
            if(!succ){
                    let data={message:"Invalid Username or Email",success:false,status:'failed'}
                    res.status(400).send(data);
            }
            else{
                if(succ.password !== req.body.password){
                        let data={message:"Invalid Password",success:false,status:'failed'}
                        res.status(400).send(data);                        
                } 
                else{
                  if(succ.isDeleted){
                    return res.send({message:"This user has beed deleted",status:"Try again",success:false,error:"User Deleted"})
                  }  
                    console.log(req.body)
                    let payload={username:succ.username,id:succ._id,email:succ.email,type:succ.type,user_role:succ.user_role}
                    const refreshToken = randomPassword();
                    var tok=attachedTokens({user:payload}) 
                    res.status(200).json({success: true,
                        error: "",
                        message: "Logged in successfully",
                        profimg:succ.profileImg,
                        data:{
                            username:succ.username,id:succ._id,email:succ.email,type:succ.type,user_role:succ.user_role
                        }
                        ,...tok});
                }
            }
    
        }
    
    })
}
const Register = async(req,res)=>{
    let usersdata=req.body;
    let userdataamodel =new User(usersdata);
    let users = await User.findOne({email:usersdata.email});
    console.log(users);
    if(users == null){
        userdataamodel.save((err,register)=>{
            if(err)
            {
                
                let resposnes={
                    resons:err,
                    status:"failed",
                    success:false
                }
                return   res.status(400).send(resposnes)
            }
            else{
                let payload={status:"success",success:true,message:'Register Successfully'}
                return  res.status(200).send(payload); 
            }
        })
    }
    else{
        return res.status(400).send({message:"User Already Exists Try With Different Credential",success:false,status:'failed'})  
    } 
}
const getfacebookuserregister = async (req,res)=>{
    let data = req.user;
    let password = generatePassword(12);
    let addfour = generateRandomFourDigitNumber();
    let UsersObj= {
        facebookId:data.id,
        password:password,
        confirmpassword:password,
        email: data._json.email !== undefined ? data._json.email:'demo@gmail.com',
        user_role:2,
        profileImg:data.photos[0].value
    }
    let userdataamodel =new User(UsersObj);
    let checkuser =await User.find({facebookId:data.id});
    if(checkuser.length > 0){
        let payload={username:checkuser[0].username,id:checkuser[0]._id,email:UsersObj.email,type:UsersObj.type,user_role:UsersObj.user_role}
        var tok=attachedTokens({user:payload}) 
        const queryParams = new URLSearchParams();
        queryParams.append('error','none');
        queryParams.append('success',true)
        queryParams.append('message','Logged-in-successfully');
        queryParams.append('accessToken',tok.accessToken);
        queryParams.append('refreshToken',tok.refreshToken);
        queryParams.append('profimg',UsersObj.profileImg)
        const jsonData = JSON.stringify(payload);
        const encodedData = encodeURIComponent(jsonData);
        res.redirect(`${process.env.FRONT_URL_LIVE}checkuser?${queryParams.toString()}&data=${encodedData}`)
    }
    else{
        userdataamodel.username=data._json.first_name + addfour,
        userdataamodel.save((err,register)=>{
         if(err)
         {
             
             let resposnes={
                 resons:err,
                 status:"failed",
                 success:false
             }
             return   res.status(400).send(resposnes)
         }
         else{
           
             let payload={username:register.username,id:register._id,email:UsersObj.email,type:UsersObj.type,user_role:UsersObj.user_role}
             var tok=attachedTokens({user:payload})              
             const queryParams = new URLSearchParams();
              queryParams.append('error','none');
              queryParams.append('success',true)
              queryParams.append('message','Logged-in-successfully');
              queryParams.append('accessToken',tok.accessToken);
              queryParams.append('refreshToken',tok.refreshToken);
              queryParams.append('newUser',true);  
              queryParams.append('profimg',UsersObj.profileImg)
              const jsonData = JSON.stringify(payload);
     
       const encodedData = encodeURIComponent(jsonData);
             res.redirect(`${process.env.FRONT_URL_LIVE}checkuser?${queryParams.toString()}&data=${encodedData}`)
         }
     })

    }
}
//create admin {username:'adminTest',password:'mubashir',confirmpassword:'mubashir',email:'ansmubasshirr@gmail.com',type:'Admin',user_role:1}
const getgauthsuccess =async (req, res) => {
    console.log('google from local');
   let data = req.user;
   let password = generatePassword(12);
   let addfour = generateRandomFourDigitNumber();
   let UsersObj= {
       password:password,
       confirmpassword:password,
       email: data._json.email,
       user_role:2,
       profileImg:data.photos[0].value
   }
   let userdataamodel =new User(UsersObj);
   let checkuser =await User.find({email:data._json.email});
   if(checkuser.length > 0){
    let payload={username:checkuser[0].username,id:checkuser[0]._id,email:UsersObj.email,type:UsersObj.type,user_role:UsersObj.user_role}
    var tok=attachedTokens({user:payload}) 
    const queryParams = new URLSearchParams();
    queryParams.append('error','none');
    queryParams.append('success',true)
    queryParams.append('message','Logged-in-successfully');
    queryParams.append('accessToken',tok.accessToken);
    queryParams.append('refreshToken',tok.refreshToken);
    queryParams.append('profimg',UsersObj.profileImg)
    const jsonData = JSON.stringify(payload);
    const encodedData = encodeURIComponent(jsonData);
    console.log(process.env.FRONT_URL_LIVE,'else');
    res.redirect(`${process.env.FRONT_URL_LIVE}checkuser?${queryParams.toString()}&data=${encodedData}`)
   }
   else{
    userdataamodel.username=data._json.given_name + addfour,
        userdataamodel.save((err,register)=>{
         if(err)
         {
             
             let resposnes={
                 resons:err,
                 status:"failed",
                 success:false
             }
             return   res.status(400).send(resposnes)
         }
         else{
           
             let payload={username:register.username,id:register._id,email:UsersObj.email,type:UsersObj.type,user_role:UsersObj.user_role}
             var tok=attachedTokens({user:payload})              
             const queryParams = new URLSearchParams();
              queryParams.append('error','none');
              queryParams.append('success',true)
              queryParams.append('message','Logged-in-successfully');
              queryParams.append('accessToken',tok.accessToken);
              queryParams.append('refreshToken',tok.refreshToken);
              queryParams.append('newUser',true);  
              queryParams.append('profimg',UsersObj.profileImg)
              const jsonData = JSON.stringify(payload);
     
       const encodedData = encodeURIComponent(jsonData);
       console.log(process.env.FRONT_URL_LIVE,'if');
             res.redirect(`${process.env.FRONT_URL_LIVE}checkuser?${queryParams.toString()}&data=${encodedData}`)
         }
     })
        }
}
module.exports={
    getgauthsuccess,getfacebookuserregister,
    login:Login,register:Register}