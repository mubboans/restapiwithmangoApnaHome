const express = require('express');

const api=require('./route/api')
const port =3000;
const app=express();
app.use(express.json());
app.use('',api);
app.get('/',(req,res)=>{
    res.send('Hello World!  From Mubashir');
})
app.listen(port,()=>{
    console.log(`Listening on port ${port}`);
})