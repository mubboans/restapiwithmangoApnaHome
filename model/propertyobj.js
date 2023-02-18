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

})
// {   "name": "axe",
// "addres":{
//       "add":"hains road",
//     "pincode":"400011", 
//     "city":"mumbai",
//     "state":"Maharashtra"
// } 
// "price":"20000"}
// addres:{    }, "address":{  }

module.exports=mongoose.model('propObj',propSchema)