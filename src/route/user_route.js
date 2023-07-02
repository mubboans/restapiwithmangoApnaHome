const express = require("express");
const { updateUser, deleteUser, getAllusers, userById } = require("../controller/usercontroller");
const verifyUserToken = require("../middleware/verifyToken");
const route = express.Router();
route.get('/users/all',getAllusers);

route.route('/user/id=:id').get(userById).put(updateUser).delete(deleteUser);
 
module.exports = route