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
    
    profileImg:{
        type:String,
        default:'https://ucarecdn.com/0d26e991-266c-491f-a842-6e2874527e9a/userprofile.jpg'
    },
    isDeleted:{
        type:Boolean,
        default:false,
    }
})
module.exports=mongoose.model('user',userSchema,'users')