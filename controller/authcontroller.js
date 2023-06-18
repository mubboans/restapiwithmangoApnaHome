const User =require('../model/user')
const jwt=require('jsonwebtoken')

function generateRandomFourDigitNumber() {
  const min = 1000;
  const max = 9999;
  return Math.floor(Math.random() * (max - min + 1) + min);
}

const {
    attachedTokens,
    randomPassword
  } =require('../utils/jwt')

const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()-_=+[{]}\\|;:'\",.<>/?";
function generatePassword(length) {
  const password = [];
  for (let i = 0; i < length; i++) {
    password.push(characters[Math.floor(Math.random() * characters.length)]);
  }
  return password.join("");
}

const Login = (req,res)=>{
    console.log('login');
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
const getfacebookuserregister = async (req,res)=>{
    let data = req.user;
    let password = generatePassword(12);
    let addfour = generateRandomFourDigitNumber();
    let UsersObj= {
        facebookId:data.id,
        password:password,
        confirmpassword:password,
        email: data._json.email !== undefined ? data._json.email:'demo@gmail.com',
        user_role:2
    }
    let userdataamodel =new User(UsersObj);
    let checkuser =await User.find({facebookId:data.id});
    if(checkuser.length > 0){
        console.log('if');
        let payload={username:checkuser[0].username,id:checkuser[0]._id,email:UsersObj.email,type:UsersObj.type,user_role:UsersObj.user_role}
        var tok=attachedTokens({user:payload}) 
        const queryParams = new URLSearchParams();
        queryParams.append('error','none');
        queryParams.append('success',true)
        queryParams.append('message','Logged-in-successfully');
        queryParams.append('accessToken',tok.accessToken);
        queryParams.append('refreshToken',tok.refreshToken);
        const jsonData = JSON.stringify(payload);
        const encodedData = encodeURIComponent(jsonData);
        res.redirect(`http://localhost:4200/#/checkuser?${queryParams.toString()}&data=${encodedData}`)
    }
    else{
        console.log('else');
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
              const jsonData = JSON.stringify(payload);
     
       const encodedData = encodeURIComponent(jsonData);
             res.redirect(`http://localhost:4200/#/checkuser?${queryParams.toString()}&data=${encodedData}`)
         }
     })

    }
}
//create admin {username:'adminTest',password:'mubashir',confirmpassword:'mubashir',email:'ansmubasshirr@gmail.com',type:'Admin',user_role:1}
const getgauthsuccess =async (req, res) => {
   let data = req.user;
   let password = generatePassword(12);
   let addfour = generateRandomFourDigitNumber();
   let UsersObj= {
       password:password,
       confirmpassword:password,
       email: data._json.email,
       user_role:2
   }
   let userdataamodel =new User(UsersObj);
   let checkuser =await User.find({email:data._json.email});
   console.log(checkuser,'user check',checkuser.length);
   if(checkuser.length > 0){
    
    console.log('if');
    let payload={username:checkuser[0].username,id:checkuser[0]._id,email:UsersObj.email,type:UsersObj.type,user_role:UsersObj.user_role}
    var tok=attachedTokens({user:payload}) 
    const queryParams = new URLSearchParams();
    queryParams.append('error','none');
    queryParams.append('success',true)
    queryParams.append('message','Logged-in-successfully');
    queryParams.append('accessToken',tok.accessToken);
    queryParams.append('refreshToken',tok.refreshToken);
    const jsonData = JSON.stringify(payload);
    const encodedData = encodeURIComponent(jsonData);
    res.redirect(`http://localhost:4200/#/checkuser?${queryParams.toString()}&data=${encodedData}`)
   }
   else{
    userdataamodel.username=data._json.given_name + addfour,
        console.log('else',userdataamodel);
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
              const jsonData = JSON.stringify(payload);
     
       const encodedData = encodeURIComponent(jsonData);
             res.redirect(`http://localhost:4200/#/checkuser?${queryParams.toString()}&data=${encodedData}`)
         }
     })
        }
}
module.exports={
    getgauthsuccess,getfacebookuserregister,
    login:Login,register:Register}