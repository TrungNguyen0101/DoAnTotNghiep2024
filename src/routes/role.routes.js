const express = require("express");
const {
  findAll,
  findById,
  create,
  update,
  deleteById,
} = require("../controllers/role.controller");
const roleRoutes = express.Router();

roleRoutes.get("/", findAll);
roleRoutes.get("/:id", findById);
roleRoutes.post("/", create);
roleRoutes.put("/:id", update);
roleRoutes.delete("/:id", deleteById);

module.exports = roleRoutes;
