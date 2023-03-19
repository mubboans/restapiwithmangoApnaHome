require('dotenv').config()
const express = require('express');
const cors=require("cors");
const prop=require('./route/addProperty')
const api=require('./route/api')
const db=require('./db/connectdb')
const cloudinary = require("cloudinary").v2;
const fileUpload = require('express-fileupload');
const bodyParser=require('body-parser');
const port =process.env.PORT || 8000;
const notFound = require('./middleware/404-not-found');
const dbstring= process.env.DBURLDEV || process.env.DBURL ;
// process.env.DBURL ||
const app=express();
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET,
})
// app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const corsOptions ={
    origin:'*', 
    credentials:true, 
    optionSuccessStatus:200,
 }
app.use(cors(corsOptions))
app.use(fileUpload({
    useTempFiles:true,
})) 
app.use('',api);
app.use('',prop);
app.use(notFound);
app.get('/',(req,res)=>{
    res.send('Hello World!  From Mubashir');
})
  app.listen(port,async ()=>{
    try{ 
        await db(dbstring)
        console.log(`Listening on port ${port}`);
        console.log('connect to db',dbstring);
        
    }
    catch(err){
        console.log(err,'error'); 
    }
    
})