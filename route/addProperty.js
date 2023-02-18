const express = require("express");
const route = express.Router();
const propObj = require('../model/propertyobj');
const verifyUserToken = require("../middleware/verifyToken");
const { deleteprop,update,addprop,getprop,getPropertByID} = require('../controller/propertyController')
// mongoose.connect('mongodb://localhost:27017/addProperty',{  useNewUrlParser: true },err=>{
//     if(err){
//         console.log("eeror occured",err)
//     }
//     else{
//         console.log("Connect to Mangodb")
//     }
// });
route.post('/addProperty',verifyUserToken,addprop);
// (req, res) => {
//     let data = req.body;
//     let propertyobj = new propObj(data);
//     console.log(data, 'Data check')
//     propertyobj.save((err, ress) => {
//         if (err) {
//             console.log("eeror occured before Saving", err)
//         }
//         else {
//             // console.log(register,'data save to server')
//             let token = { Status: 'Property Save' }
//             res.status(200).send(token);
//         }
//         //  {   "name": "axe",
//         //     "addres":{
//         //           "add":"hains road",
//         //         "pincode":"400011", 
//         //         "city":"mumbai",
//         //         "state":"Maharashtra"
//         //     } }
//     })
// }
// {   "name": "axe",
// "addres":{
//       "add":"hains road",
//     "pincode":"400011", 
//     "city":"mumbai",
//     "state":"Maharashtra"
// },
// "price":"42000" }
route.get('/prop/user=:userid', getPropertByID)
route.put('/addProperty/id=:id',verifyUserToken,update)
// (req,res)=>{
//     propObj.findByIdAndUpdate(req.params.id,{$set:{name:req.body.name,addres:req.body.addres,price:req.body.price}},{new:true},(err,obj)=>{
//         if(err)
//         {
//             let responsed={"status":"Failed","err":err}
//             res.send(responsed);
//         }
//         else{
//             let responsed={"status":"Data updated"}
//             res.send(responsed);
//         }
//     }
//     )
// }
route.delete('/addProperty/id=:id',verifyUserToken,deleteprop)
// (req,res)=>{
//     propObj.findByIdAndRemove(req.params.id,(err,obj)=>{
//         if(err){
//             let responsed={"status":"Failed","err":err}
//             res.send(responsed);
//         }
//         else{
//             console.log(obj)
//             let responsed={"status":"Deleted Succesfully"}
//             res.send(responsed);
//         }
//     })
// }
route.get('/property',verifyUserToken, getprop)
// (req,res)=>{
//     propObj.find((err,obj)=>{
//       if(err){
//         console.log('Error to get Property',err);
//       }   
//       else{
//         console.log(obj)
//         res.send(obj);
//       }
//     })
// }
module.exports = route;