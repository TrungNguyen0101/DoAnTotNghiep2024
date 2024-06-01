const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");

cloudinary.config({
  cloud_name: "dsrvia1wu",
  api_key: "597996935416925",
  api_secret: "M6qiRhiWaiDgPGWvTX9-9gT6UrQ",
});
const storage = new CloudinaryStorage({
  cloudinary,
  allowedFormats: [],
  params: {
    folder: "nguyenGMO",
    resource_type: "auto",
  },
});

const uploadCloud = multer({ storage });

module.exports = uploadCloud;
