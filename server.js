require('dotenv').config()
const express = require('express');
const cors=require("cors");
const prop=require('./route/addProperty')
const api=require('./route/api')
const db=require('./db/connectdb')
const port =process.env.PORT || 8000;
const dbstring=process.env.DBURL;
const app=express();
app.use(express.json());
const corsOptions ={
    origin:'*', 
    credentials:true, 
    optionSuccessStatus:200,
 }
app.use(cors(corsOptions))
app.use('',api);
app.use('',prop);
app.get('/',(req,res)=>{
    res.send('Hello World!  From Mubashir');
})
app.listen(port,async ()=>{
    try{
        await db(dbstring)
        console.log(`Listening on port ${port}`);
        console.log('connect to db');
    }
    catch(err){
        console.log(err);
    }
    
})