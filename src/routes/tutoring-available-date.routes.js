const express = require("express");
const {
  findAll,
  findById,
  create,
  update,
  deleteById,
  createMany,
  findByUserId
} = require("../controllers/tutor-available-date.controller");
const tutorAvailableRoutes = express.Router();

/**
 * Mô tả router
 */

tutorAvailableRoutes.get("/", findAll);
tutorAvailableRoutes.get("/find-by-userid/:id", findByUserId);
tutorAvailableRoutes.get("/:id", findById);
tutorAvailableRoutes.post("/", create);
tutorAvailableRoutes.post("/create-many", createMany);
tutorAvailableRoutes.put("/:id", update);
tutorAvailableRoutes.delete("/:id", deleteById);

module.exports = tutorAvailableRoutes;
