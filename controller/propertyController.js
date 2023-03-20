const propObj = require('../model/propertyobj');
const cloudinary = require("cloudinary").v2;
const deleteprop =async (req,res)=>{
    let id =req.params.id
    console.log(id,'id');
        let data = await propObj.find({_id:id},{_id:0,__v:0})
        if(data){
            console.log(data,'data find',data[0].img_id);
            try{
            await cloudinary.uploader.destroy(data[0].img_id);
            console.log('deleted image');
            }
            catch(err){
               console.log(err.message)
            }
            propObj.findByIdAndRemove(id,(err,obj)=>{
                if(err){
                    let responsed={status:"Failed",success:false,error:err}
                    res.status(400).send(responsed);
                }
                else{
                    console.log(obj)
                    let responsed={status:"Deleted Succesfully",success:true,}
                    res.status(200).send(responsed);
                }
            })
        }
    else{
        
        res.status(400).send({message:"Cant Find Data with given Id",success:false}) 
    }
    }
    
const update =async (req,res)=>{
        let id =req.params.id
    
   
        let pro= new propObj(req.body)

        if(req.files){
            let data = await propObj.find({_id:id})
            try{
                await cloudinary.uploader.destroy(data[0].img_id)
            }
            catch(err){
                console.log(err);
            }
            const { tempimage } = req.files;
            if(tempimage){
                const maxSize = 1024 * 1024;
                if(!tempimage.mimetype.startsWith("image")) {
                    return res.status(400).send({mesagge:"Please File Type as Image",error:"File type not match with image",success:false})
                  }
                if(tempimage.size > maxSize){
                    return res.status(400).send({mesagge:"Please select Image less than 1 mb",error:"Image size is greater",success:false})
                }
    
               const result=await cloudinary.uploader.upload(tempimage.tempFilePath,{
                    use_filename:true,
                    folder:"property/"
                })
                pro.img=result.secure_url;
                pro.img_id=result.public_id;
            }
         
        }
       
        pro.addres.add = req.body.address;
        pro.addres.city = req.body.city;
        pro.addres.pincode = req.body.pincode;
        pro.addres.state = req.body.state;
        let updatedObj ={
            name:pro.name,
            addres:pro.addres,
            price:pro.price,
            img:pro.img,
            username:pro.username,
            userID:pro.userID,
            img:pro.img,
            img_id:pro.img_id
        }

        propObj.findByIdAndUpdate({_id:id},updatedObj,(err,obj)=>{
            if(err)
            {
                let responsed={"message":"Failed","err":err,success:false}
                res.status(400).send(responsed);
            }
            else{
                let responsed={"message":"Data updated","success":true}
                res.status(200).send(responsed)
            }
        }
        )
    
}

const getPropertByID = (req,res)=>{
    const id = req.params.userid.toString()
    
    propObj.find({userID:id}).sort({_id:-1}).exec(
            (err, obj) => {
                if (err) {
                    const responsed={status:"error in getting data",success:false,error:err};
                    res.status(404).send(responsed)
                }
                else {
                    res.status(200).send({message:'Successfull Gey',data:obj,succes:true})
                }
            }
        )
    
}
function randomIntFromInterval(min, max) { 
    return Math.floor(Math.random() * (max - min + 1) + min)
  }
const addprop=async (req,res)=>{
    let data = req.body;
    let propertyobj = new propObj(data);
  
    if(!req.files || !req.files.tempimage){
       return res.status(400).send({mesagge:"Please Select Image",success:false,error:"Post Failed"})
    }
    else{
        const maxSize = 1024 * 1024;
       
        const {tempimage}=req.files
       
        if(!tempimage.mimetype.startsWith("image")) {
            return res.status(400).send({mesagge:"Please select Image",error:"Post Failed"})
          }
        if(tempimage.size > maxSize){
            return res.status(400).send({mesagge:"Please select Image less than 1MB",error:"Post Failed"})
        }
    
     
        propertyobj.addres.add = req.body.address;
        propertyobj.addres.city = req.body.city;
        propertyobj.addres.pincode = req.body.pincode;
        propertyobj.addres.state = req.body.state; 
        console.log(req.body.addres,'Address');
        try{
            const result = await cloudinary.uploader.upload(tempimage.tempFilePath,{
                folder:"property/",
                use_filename:true
            })
            propertyobj.img=result.secure_url;
            propertyobj.img_id=result.public_id;
        }
        catch(err){
            console.log(err);
        }
     
      
          
          propertyobj.rating = randomIntFromInterval(1, 5)
        propertyobj.save((err, ress) => {
            if (err) {
                let responsed ={mesagge:"Error in Saving Property",error:err.message}
               return res.status(400).send(responsed)
            }
            else {
                let responsed = {mesagge: 'Property Save',"success":true }
               return res.status(201).send(responsed);
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
            let reponsed={status:"Error to get data",error:err,success:false}
            res.status(404).send(reponsed)
          }   
          else{
            res.status(200).send({data:obj,success:true});
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