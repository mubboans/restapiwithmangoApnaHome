const express = require("express");
const route = express.Router();
const passport = require("passport");
// const mongoose=require('mongoose');
const {login,register, getgauthsuccess,getfacebookuserregister}=require('../controller/authcontroller')
const valrequest = require('../middleware/validateRequest')
const User =require('../model/user')
route.post('/register',valrequest,register)

route.post('/login',valrequest ,login)

route.get('/gauth/success',getgauthsuccess)

route.get('/google',passport.authenticate('google',{scope:['profile']}))

route.get('/auth/google/callback',passport.authenticate("google",{failureRedirect:'/login'}),
getgauthsuccess
)

route.get('/auth/facebook', passport.authenticate('facebook',{scope:['profile','email']}));

route.get('/auth/facebook/callback',
  passport.authenticate('facebook', {failureRedirect: '/login'}),
 getfacebookuserregister);


route.get('/user',(req,res)=>{
    var data=['Ansari','Mubashir','Rafique','Ahmed'];
    res.send(data);
    console.log(data,req.body);
})
route.get('/google',passport.authenticate("google",["profile","email"]))
module.exports = route; 