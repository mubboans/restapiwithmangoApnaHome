const express = require("express");
const route = express.Router();
// const mongoose=require('mongoose');
const {login,register}=require('../controller/authcontroller')
const valrequest = require('../middleware/validateRequest')
const User =require('../model/user')
// const raildbstring="mongodb://mongo:00y3f5vQUXcMNODqkU3c@containers-us-west-168.railway.app:6958";
// const dbcloudurl='mongodb+srv://mubbo:123@cluster0.xzkwekg.mongodb.net/?retryWrites=true&w=majority';
// 'mongodb://localhost:27017/appData',{  useNewUrlParser: true }
// mongoose.connect(raidbstring,err=>{
//     if(err){
//         console.log("eeror occured",err)
//     }
//     else{
//         console.log("Connect to Mangodb")
//     }
// });
route.post('/register',valrequest,register)
// (req,res)=>{
//     let usersdata=req.body;
//     console.log(usersdata,'user data');
//     let userdataamodel =new User(usersdata);
//     userdataamodel.save((err,register)=>{
//         if(err)
//         {
//             console.log("eeror occured before Saving",err)
//             let resposnes={
//                 resons:err,
//                 status:"failed"
//             }
//             res.status(500).send(resposnes)
//         }
//         else{
//             console.log(register,'data save to server')
//             let payload={staus:"Register Successfully"}
//             // let token =jwt.sign(payload,'secret')
//             res.status(200).send(payload); 
//             // {
//             //     "username": "mubbo123123",
//             //     "password": "123",
//             //     "confirmpassword": "123",
//             //     "email": "123@gmail.com",
//             //     "type": "buyer",
//             //     "user_role":"2"
//             // }
//         }
//     })
//     // CLient ID a2237ad6-14da-4188-8f8a-746ecf38b7e6
//     // ID 5433f94d-6dba-481f-829a-670f24c7e4fb
//     // heroku config:add \ HEROKU_OAUTH_ID=a2237ad6-14da-4188-8f8a-746ecf38b7e6 \ HEROKU_OAUTH_SECRET=4911b42e-ecee-4066-87e6-3161f296bcbd
// }

route.post('/login',valrequest ,login)
// (req,res)=>{
//     let loginData=req.body;
    
//     User.findOne({username:loginData.username},(err,succ)=>{
//         if(err){
//             console.log(err,'err occur');
//         }
//         else{
//             if(!succ){
//                 let data={status:"Invalid Username"}
//                 res.status(200).send(data);
//             }
//             else{
//                 if(succ.password !== loginData.password){
//                     let data={status:"Invalid Password"}
//                     res.status(200).send(data);    
//                 }
//                 else{
//                     let payload={userdetail:succ}
//                     let token =jwt.sign(payload,'secret')
//                     res.status(200).send({token});
//                 }
//             }
    
//         }
    
//     })
//     }
route.get('/user',(req,res)=>{
    var data=['Ansari','Mubashir','Rafique','Ahmed'];
    res.send(data);
    console.log(data,req.body);
})

module.exports = route;