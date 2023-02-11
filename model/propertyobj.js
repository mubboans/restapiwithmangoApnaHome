const mongoose=require('mongoose');
const schema=mongoose.Schema
const propSchema =new schema({
    name:{
        type: String,
        required: true
    },
    addres:{
        add:String,
        pincode:String,
        city:String,
        state:String
    },
    price:{
        type: String,
        required: true
    },

})
// addres:{    }, "address":{  }

module.exports=mongoose.model('propObj',propSchema)