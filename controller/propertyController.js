const propObj = require('../model/propertyobj');
const cloudinary = require("cloudinary").v2;
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
const update =async (req,res)=>{
    
    if(!res.files || !req.files.tempimage){
        res.send({mesagge:"Please Select Image",error:"Update Failed"})
    }
    else{
        const { image } = req.files;
        const maxSize = 1024 * 1024;
        if(!tempimage.mimetype.startsWith("image")) {
            return res.status(402).send({mesagge:"Please File Type as Image",error:"Post Failed"})
          }
        if(image.size > maxSize){
            return res.status(402).send({mesagge:"Please select Image less than 1 mb",error:"Post Failed"})
        }
       const result=await cloudinary.uploader.upload(image.tempFilePath,{
            use_filename:true,
            folder:"property/"
        })
        req.img=result.secure_url;

        propObj.findByIdAndUpdate(req.params.id,{$set:{name:req.body.name,addres:req.body.addres,price:req.body.price}},{new:true},(err,obj)=>{
            if(err)
            {
                let responsed={"message":"Failed","err":err}
                res.send(responsed);
            }
            else{
                let responsed={"message":"Data updated"}
                res.send(responsed);
            }
        }
        )
    }
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

const addprop=async (req,res)=>{
    let data = req.body;
    let propertyobj = new propObj(data);
  
    if(!req.files || !req.files.tempimage){
       return res.send({mesagge:"Please Select Image",error:"Post Failed"})
    }
    else{
        const maxSize = 1024 * 1024;
       
        const {tempimage}=req.files
        if(!tempimage.mimetype.startsWith("image")) {
            return res.status(402).send({mesagge:"Please select Image",error:"Post Failed"})
          }
        if(tempimage.size > maxSize){
            return res.status(402).send({mesagge:"Please select Image less than 1MB",error:"Post Failed"})
        }
        const result = await cloudinary.uploader.upload(tempimage.tempFilePath,{
            folder:"property/",
            use_filename:true
        })
        propertyobj.img=result.secure_url;

        propertyobj.save((err, ress) => {
            if (err) {
                let responsed ={mesagge:"Error in Saving Property",error:err}
               return res.status(200).send(responsed)
            }
            else {
                let responsed = {mesagge: 'Property Save' }
               return res.status(200).send(responsed);
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