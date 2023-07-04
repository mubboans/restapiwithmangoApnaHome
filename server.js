require('dotenv').config()
const express = require('express');
const cors=require("cors");
const propertyroute=require('./src/route/addProperty')
const authroute=require('./src/route/authroute')
const db=require('./src/db/connectdb')
const userroute = require('./src/route/user_route')
const cloudinary = require("cloudinary").v2;
const fileUpload = require('express-fileupload');
const bodyParser=require('body-parser');
const port =process.env.PORT || 8000;
const notFound = require('./src/middleware/404-not-found');
const dbstring= process.env.DBURLDEV || process.env.DBURL ;
const passport  = require('passport');
const passportSetup = require('./src/utils/passport');
const cookieParser = require("cookie-parser");
const session = require("express-session");
const verifyToken = require('./src/middleware/verifyToken')
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
    allowedHeaders: ['Content-Type', 'Authorization']
 }
app.use(cors(corsOptions))
app.use(fileUpload({
    useTempFiles:true,
})) 
app.use(cookieParser());
app.use(
  session({
    secret: "secret-key",
    resave: false,
    saveUninitialized: false
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use('',authroute);
app.use('/myapi/apnahome',verifyToken,propertyroute);
app.use('/myapi/apnahome',verifyToken,userroute);
app.use(notFound);
app.get('/check',(req,res)=>{
    res.status(200).send('Hello World!  From Mubashir');
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