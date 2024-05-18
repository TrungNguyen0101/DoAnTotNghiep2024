const express = require("express");
const { login, register } = require("../controllers/auth.controller");
const authRouters = express.Router();
const uploadCloud = require("../middlewares/uploader");


authRouters.post("/login", login);
authRouters.post("/register", uploadCloud.fields([
    { name: 'file_cv', maxCount: 1 },
    { name: 'avatar_url', maxCount: 1 } 
]), register);

module.exports = authRouters;
