const express = require("express");
const {
  findAll,
  findById,
  create,
  update,
  deleteById,
  findByUserIdAndCourseId,
  findByCourseIdDone,
  findByUserIdDone,
} = require("../controllers/booked-session.controller");
const bookedSessionRoutes = express.Router();

/**
 * Mô tả router
 */
bookedSessionRoutes.get("/", findAll);
bookedSessionRoutes.get("/my-course-user", findByUserIdDone);
bookedSessionRoutes.get("/my-course", findByUserIdAndCourseId);
bookedSessionRoutes.get("/count-course", findByCourseIdDone);
bookedSessionRoutes.get("/:id", findById);
bookedSessionRoutes.post("/", create);
bookedSessionRoutes.put("/:id", update);
bookedSessionRoutes.delete("/:id", deleteById);

module.exports = bookedSessionRoutes;
