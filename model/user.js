const mongoose=require('mongoose');
const schema=mongoose.Schema
const userSchema =new schema({
    username:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    confirmpassword:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    type:{
        type: String
    },
    user_role:{
        type: String,
        required: true
    },
    facebookId:{
        type:String,
    },
})
module.exports=mongoose.model('user',userSchema,'users')