const express = require("express");
const route = express.Router();
const mongoose=require('mongoose');
const propObj =require('../model/propertyobj');
mongoose.connect('mongodb://localhost:27017/addProperty',{  useNewUrlParser: true },err=>{
    if(err){
        console.log("eeror occured",err)
    }
    else{
        console.log("Connect to Mangodb")
    }
});
route.post('/addProperty',(req,res)=>{
let data=req.body;
let propertyobj =new propObj(data);
console.log(data,'Data check')
    propertyobj.save((err,ress)=>{
        if(err)
        {
            console.log("eeror occured before Saving",err)
        }
        else{
            // console.log(register,'data save to server')
            let token={Status:'Property Save'}
            res.status(200).send(token);
        }
    })
});
route.get('/prop/id=:id',(req,res)=>{
    propObj.findById(req.params.id).exec(
        (err,obj)=>{
            if(err){
                console.log(err);
            }
            else{
                res.json(obj)
            }
        }
    )
})
module.exports = route;