const express = require("express");
const route = express.Router();
const mongoose = require('mongoose');
const propObj = require('../model/propertyobj');

// mongoose.connect('mongodb://localhost:27017/addProperty',{  useNewUrlParser: true },err=>{
//     if(err){
//         console.log("eeror occured",err)
//     }
//     else{
//         console.log("Connect to Mangodb")
//     }
// });
route.post('/addProperty', (req, res) => {
    let data = req.body;
    let propertyobj = new propObj(data);
    console.log(data, 'Data check')
    propertyobj.save((err, ress) => {
        if (err) {
            console.log("eeror occured before Saving", err)
        }
        else {
            // console.log(register,'data save to server')
            let token = { Status: 'Property Save' }
            res.status(200).send(token);
        }
        //  {   "name": "axe",
        //     "addres":{
        //           "add":"hains road",
        //         "pincode":"400011", 
        //         "city":"mumbai",
        //         "state":"Maharashtra"
        //     } }
    })
});
route.get('/prop/id=:id', (req, res) => {
    propObj.findById(req.params.id).exec(
        (err, obj) => {
            if (err) {
                console.log(err);
            }
            else {
                res.json(obj)
            }
        }
    )
})
route.put('/addProperty/id=:id',(req,res)=>{
    propObj.findByIdAndUpdate(req.params.id,{$set:{name:req.body.name,addres:req.body.addres,price:req.body.price}},{new:true},(err,obj)=>{
        if(err)
        {
            let responsed={"status":"Failed"}
            res.send(responsed);
        }
        else{
            let responsed={"status":"Data updated"}
            res.send(responsed);
        }
    }
    )
})
route.get('/property',(req,res)=>{
    propObj.find((err,obj)=>{
      if(err){
        console.log('Error to get Property',err);
      }   
      else{
        console.log(obj)
        res.send(obj);
      }
    })
})
module.exports = route;