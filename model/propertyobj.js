const mongoose=require('mongoose');
const schema=mongoose.Schema
const propSchema =new schema({
    name:String,
    addres:{
        add:String,
        pincode:String,
        city:String,
        state:String
    }
})
// addres:{    }, "address":{  }

module.exports=mongoose.model('propObj',propSchema)