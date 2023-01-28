const express = require("express");
const route = express.Router();
const body = require('body-parser');
const mongoose=require('mongoose');
const User =require('../model/user')
const app = express();
app.use(express.json());
app.use(express.urlencoded());
const db='mongodb+srv://mubbo:123@cluster0.xzkwekg.mongodb.net/?retryWrites=true&w=majority';
mongoose.connect(db,err=>{
    if(err){
        console.log("eeror occured",err)
    }
    else{
        console.log("Connect to Mangodb")
    }
})
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
            res.status(200).send(register);
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
                res.status(200).send(succ);
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