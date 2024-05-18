const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");

cloudinary.config({
  cloud_name: "dwfjwrh8a",
  api_key: "916367626457865",
  api_secret: "MYTGVsP0Hkswzq9KXUn_Wpnbm14",
});

const storage = new CloudinaryStorage({
  cloudinary,
  allowedFormats: [],
  params: {
    folder: "giasu",
    resource_type: "auto",
  },
});

const uploadCloud = multer({ storage });

module.exports = uploadCloud;
