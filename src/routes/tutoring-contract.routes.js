const express = require("express");
const {
  findAll,
  findById,
  create,
  update,
  deleteById,
} = require("../controllers/tutoring-contract.controller");
const tutoringContractRoutes = express.Router();

/**
 * Mô tả router
 */
tutoringContractRoutes.get("/", findAll);
tutoringContractRoutes.get("/:id", findById);
tutoringContractRoutes.post("/", create);
tutoringContractRoutes.put("/:id", update);
tutoringContractRoutes.delete("/:id", deleteById);

module.exports = tutoringContractRoutes;
