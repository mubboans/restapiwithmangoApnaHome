const mongoose=require('mongoose');
async function connectDb(uri){
return await mongoose.connect(uri)

}
module.exports = connectDb