const express = require("express");
const {
  findAll,
  findById,
  create,
  update,
  deleteById,
  findTurtolBySubject,
} = require("../controllers/category.controller");
const uploadCloud = require("../middlewares/uploader");
const categoryRoutes = express.Router();

/**
 * Mô tả router
 */
categoryRoutes.get("/", findAll);
categoryRoutes.get("/:id", findById);
categoryRoutes.post(
  "/",
  uploadCloud.fields([{ name: "image_url", maxCount: 1 }]),
  create
);
categoryRoutes.put(
  "/:id",
  uploadCloud.fields([{ name: "image_url", maxCount: 1 }]),
  update
);
categoryRoutes.delete("/:id", deleteById);
categoryRoutes.post("/searchByCategryId/:id", findTurtolBySubject);
module.exports = categoryRoutes;
