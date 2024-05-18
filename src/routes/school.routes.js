const express = require("express");
const {
  findAll,
  findById,
  create,
  update,
  deleteById,
} = require("../controllers/school.controller");
const schoolRoutes = express.Router();

schoolRoutes.get("/", findAll);
schoolRoutes.get("/:id", findById);
schoolRoutes.post("/", create);
schoolRoutes.put("/:id", update);
schoolRoutes.delete("/:id", deleteById);

module.exports = schoolRoutes;
