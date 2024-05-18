const express = require("express");
const {
  findAll,
  findById,
  create,
  update,
  deleteById,
} = require("../controllers/schedule.controller");
const scheduleRoutes = express.Router();

/**
 * Mô tả router
 */
scheduleRoutes.get("/", findAll);
scheduleRoutes.get("/:id", findById);
scheduleRoutes.post("/", create);
scheduleRoutes.put("/:id", update);
scheduleRoutes.delete("/:id", deleteById);

module.exports = scheduleRoutes;
