const propObj = require('../model/propertyobj');
const deleteprop = (req,res)=>{
    propObj.findByIdAndRemove(req.params.id,(err,obj)=>{
        if(err){
            let responsed={"status":"Failed","err":err}
            res.send(responsed);
        }
        else{
            console.log(obj)
            let responsed={"status":"Deleted Succesfully"}
            res.send(responsed);
        }
    })
}
const update = (req,res)=>{
    propObj.findByIdAndUpdate(req.params.id,{$set:{name:req.body.name,addres:req.body.addres,price:req.body.price}},{new:true},(err,obj)=>{
        if(err)
        {
            let responsed={"status":"Failed","err":err}
            res.send(responsed);
        }
        else{
            let responsed={"status":"Data updated"}
            res.send(responsed);
        }
    }
    )
} 
const getPropertByID = (req,res)=>{
    const id = req.params.userid.toString()
        const d=typeof id
    console.log(id.toString(),'id check',d);
    propObj.find({userID:id}).exec(
            (err, obj) => {
                if (err) {
                    const responsed={status:"error in getting data",error:err};
                    res.status(200).send(responsed)
                }
                else {
                    res.json(obj)
                }
            }
        )
    
}

const addprop=(req,res)=>{
    let data = req.body;
    let propertyobj = new propObj(data);
    console.log(data, 'Data check')
    propertyobj.save((err, ress) => {
        if (err) {
            let responsed ={status:"Error in Saving Property",error:err}
            res.status(200).send(responsed)
        }
        else {
            let responsed = { Status: 'Property Save' }
            res.status(200).send(responsed);
        }
        //  {   "name": "axe",
        //     "addres":{
        //           "add":"hains road",
        //         "pincode":"400011", 
        //         "city":"mumbai",
        //         "state":"Maharashtra"
        //     } }
    })
} 
const getprop=(req,res)=>{
        propObj.find((err,obj)=>{
          if(err){
            let reponsed={status:"Error to get data",error:err}
            res.status(200).send(reponsed)
          }   
          else{
            res.send(obj);
          }
        })
    
}
module.exports={
    deleteprop:deleteprop,
    update:update,
    addprop:addprop,
    getprop:getprop,
    getPropertByID:getPropertByID
}