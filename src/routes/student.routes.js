const express = require("express");
const {
  findAll,
  findById,
  create,
  update,
  deleteById,
  updateStudentEducations,
  getStudentByUserId,
} = require("../controllers/student-profile.controller");

const studentRoutes = express.Router();

studentRoutes.get("/", findAll);
studentRoutes.get("/:id", findById);
studentRoutes.post("/", create);
studentRoutes.put("/:id", update);
studentRoutes.delete("/:id", deleteById);
studentRoutes.put("/update-student-educations/:id", updateStudentEducations);
studentRoutes.get("/get-student-by-userId/:id", getStudentByUserId);

module.exports = studentRoutes;
