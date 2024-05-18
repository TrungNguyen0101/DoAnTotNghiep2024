const express = require("express");
const { handleUploadFile } = require("../controllers/upload.controller");

const uploadRouters = express.Router();
const uploadCloud = require("../middlewares/uploader");

uploadRouters.post("/", uploadCloud.single("file"), handleUploadFile);

module.exports = uploadRouters;
