const express = require('express');
const cors=require("cors");
const prop=require('./route/addProperty')
const api=require('./route/api')
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
app.listen(port,()=>{
    console.log(`Listening on port ${port}`);
})