const express = require('express');
const cors=require("cors");
const prop=require('./route/addProperty')
const api=require('./route/api')
const db=require('./db/connectdb')
const port =3000;
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
        await db("mongodb://mongo:00y3f5vQUXcMNODqkU3c@containers-us-west-168.railway.app:6958")
        console.log(`Listening on port ${port}`);
        console.log('connect to db');
    }
    catch(err){
        console.log(err);
    }
    
})