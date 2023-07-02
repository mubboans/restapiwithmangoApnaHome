const express = require("express");
const route = express.Router();
const propObj = require('../model/propertyobj');
const fileupload = require("express-fileupload");
const verifyUserToken = require("../middleware/verifyToken");
 
const { deleteprop,update,addprop,getprop,getPropertByID} = require('../controller/propertyController')

route.post('/property/add',addprop);
route.get('/property/user=:userid', getPropertByID)
route.put('/property/update/id=:id',update)
route.delete('/property/delete/id=:id',deleteprop);
route.get('/property/all', getprop)

module.exports = route;