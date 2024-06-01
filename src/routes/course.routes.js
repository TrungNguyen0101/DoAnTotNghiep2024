const express = require("express");
const {
  findAll,
  findById,
  create,
  update,
  deleteById,
  getListCourseHome,
  findAllbyTutor,
  findAllByCategory,
} = require("../controllers/course.controller");
const uploadCloud = require("../middlewares/uploader");
const courseRoutes = express.Router();

courseRoutes.get("/", findAll);
courseRoutes.get("/:id", findById);
courseRoutes.post(
  "/",
  uploadCloud.fields([{ name: "image_url", maxCount: 1 }]),
  create
);
courseRoutes.put(
  "/:id",
  uploadCloud.fields([{ name: "image_url", maxCount: 1 }]),
  update
);
courseRoutes.delete("/:id", deleteById);
courseRoutes.get("/getlistcourselimit", getListCourseHome);
courseRoutes.get("/get-by-tutor-id/:id", findAllbyTutor);
courseRoutes.get("/get-by-category-id/:id", findAllByCategory);

module.exports = courseRoutes;
