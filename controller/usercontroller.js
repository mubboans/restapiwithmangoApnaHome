const User =require('../model/user');

const userById = (req,res)=>{
    let id= req.params.id;
    User.find({_id:id},(err,obj)=>{
        if(err){
            res.status(404).send({message:`Can't get User by ${id}`,success:false,error:err.message})
        }
        else{
            res.status(200).send({message:"Found User",success:true,status:'Success',data:obj[0]});
        }
    })
}
const getAllusers = (req,res)=>{
    User.find().sort({_id:-1}).exec((err,docs)=>{
        if (!err) {
            let responsee={status :'success',success:true,message:'Successfull fetch all Users',data:docs}
            res.status(200).send(responsee);
            console.log(responsee)
        } else {
            res.status(404).send({message:`Can't get at time`,success:false,error:err.message})
            // console.log('Failed to retrieve the Course List: ' + err);
        }
    })
}
const updateUser=(req,res)=>{
    let id= req.params.id;
    let data =req.body;
    let userobj = {
        username: data.username,
        password:data.password,
        email:data.email,
        type:data.type,
        confirmpassword:data.confirmpassword
    }
    if(data.password !== data.confirmpassword){
        return  res.status(400).send({message:"Password and Confirm Password Should Match",success:false,status:"fail to update"});
    }
    User.findByIdAndUpdate({_id:id},userobj,(err,obj)=>{
        if(err){
            res.status(400).send({message:'Failed to update user',success:false,error:err.message})
        }
        else{
            res.status(200).send({message:"Updated user",success:true,status:"Success"});
        }
    })
}
const deleteUser=(req,res)=>{
    let id= req.params.id;
    User.findByIdAndDelete({_id:id},(err,obj)=>{
        if(err){
            res.status(400).send({message:'Failed to delete user',success:false,error:err.message})
        }
        else{
            res.status(200).send({message:"Deleted user",success:true,status:"Success"});
        }
    })
}
module.exports  = {updateUser,deleteUser,userById,getAllusers}