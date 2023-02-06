const express = require("express");
const route = express.Router();
const jwt=require('jsonwebtoken')
const mongoose=require('mongoose');
const User =require('../model/user')
const dbcloudurl='mongodb+srv://mubbo:123@cluster0.xzkwekg.mongodb.net/?retryWrites=true&w=majority';
mongoose.connect('mongodb://localhost:27017/appData',{  useNewUrlParser: true },err=>{
    if(err){
        console.log("eeror occured",err)
    }
    else{
        console.log("Connect to Mangodb")
    }
});
route.post('/register',(req,res)=>{
    let usersdata=req.body;
    console.log(usersdata,'user data');
    let userdataamodel =new User(usersdata);
    userdataamodel.save((err,register)=>{
        if(err)
        {
            console.log("eeror occured before Saving",err)
        }
        else{
            console.log(register,'data save to server')
            let payload={usname:register.username,userid:register._id,register}
            let token =jwt.sign(payload,'secret')
            res.status(200).send({token});
        }
    })
    // CLient ID a2237ad6-14da-4188-8f8a-746ecf38b7e6
    // ID 5433f94d-6dba-481f-829a-670f24c7e4fb
    // heroku config:add \ HEROKU_OAUTH_ID=a2237ad6-14da-4188-8f8a-746ecf38b7e6 \ HEROKU_OAUTH_SECRET=4911b42e-ecee-4066-87e6-3161f296bcbd
})

route.get('/data',(req,res)=>{
    User.find((err,docs)=>{
        if (!err) {
            res.send(docs);
            console.log(docs)
        } else {
            console.log('Failed to retrieve the Course List: ' + err);
        }
    })
})
route.post('/login',(req,res)=>{
let loginData=req.body;
User.findOne({username:loginData.username},(err,succ)=>{
    if(err){
        console.log(err,'err occur');
    }
    else{
        if(!succ){
            res.status(401).send('Invalid Username');
        }
        else{
            if(succ.password !== loginData.password){
                res.status(401).send('Invalid Password');    
            }
            else{
                let payload={subject:succ._id}
                let token =jwt.sign(payload,'secret')
                res.status(200).send({token});
            }
        }

    }

})
})

route.get('/user',(req,res)=>{
    var data=['Ansari','Mubashir','Rafique','Ahmed'];
    res.send(data);
    console.log(data,req.body);
})
module.exports = route;