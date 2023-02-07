const mongoose=require('mongoose');
const schema=mongoose.Schema
const userSchema =new schema({
    username:String,
    password:String,
    confirmpassword:String,
    email:String,
    type:String
})
module.exports=mongoose.model('user',userSchema,'users')