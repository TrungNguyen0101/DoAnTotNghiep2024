const express = require("express");
const {
  findAll,
  findById,
  create,
  update,
  deleteById,
  findTurtolBySubject
} = require("../controllers/category.controller");
const categoryRoutes = express.Router();

/**
 * Mô tả router
 */
categoryRoutes.get("/", findAll);
categoryRoutes.get("/:id", findById);
categoryRoutes.post("/", create);
categoryRoutes.put("/:id", update);
categoryRoutes.delete("/:id", deleteById);
categoryRoutes.post("/searchByCategryId/:id", findTurtolBySubject)
module.exports = categoryRoutes;
