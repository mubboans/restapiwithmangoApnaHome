const mongoose=require('mongoose');
const schema=mongoose.Schema
const propSchema =new schema({
    name:{
        type: String,
        required: true
    },
    rating:{
        type:Number,
        required:true
    },
    addres:{
        add:{type:String},
        pincode:{type:Number},
        city:{type:String},
        state:{type:String},
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
       type:String,
       required:true
    },
    img_id:{
        type:String,
        required:true
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