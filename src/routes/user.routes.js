const express = require("express");
const {
  getUserInfo,
  updateUserInfo,
  findAllAccount,
} = require("../controllers/user.controller");
const userRouters = express.Router();

userRouters.get("/", findAllAccount);
userRouters.get("/get-user-info/:id", getUserInfo);
userRouters.put("/update-user-info/:id", updateUserInfo);

module.exports = userRouters;
