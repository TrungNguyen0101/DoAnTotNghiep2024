const express = require("express");
const {
  findAll,
  findById,
  create,
  update,
  deleteById,
  getListCourseHome,
  findAllbyTutor,
} = require("../controllers/course.controller");
const courseRoutes = express.Router();

courseRoutes.get("/", findAll);
courseRoutes.get("/:id", findById);
courseRoutes.post("/", create);
courseRoutes.put("/:id", update);
courseRoutes.delete("/:id", deleteById);
courseRoutes.get("/getlistcourselimit", getListCourseHome);
courseRoutes.get("/get-by-tutor-id/:id", findAllbyTutor);

module.exports = courseRoutes;
