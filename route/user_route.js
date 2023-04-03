const express = require("express");
const { updateUser, deleteUser, getAllusers, userById } = require("../controller/usercontroller");
const verifyUserToken = require("../middleware/verifyToken");
const route = express.Router();
route.get('/users',getAllusers);

route.route('/user/id=:id').get(verifyUserToken,userById).put(verifyUserToken,updateUser).delete(verifyUserToken,deleteUser);

module.exports = route