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
        state:String,
    },
    price:{
        type: String,
        required: true
    },
    userID:{
        type:String,
        required:true,
    },
    username:{
        type:String,
        required:true,
    },
    img:
    {
        data: Buffer,
        contentType: String
    }
})
// {   "name": "axe",
// "addres":{
    //   "add":"hains road",
    // "pincode":"400011", 
    // "city":"mumbai",
    // "state":"Maharashtra"
// } 
// "price":"20000" ,"userID":"1","username":""}
// addres:{    }, "address":{  }

module.exports=mongoose.model('propObj',propSchema)