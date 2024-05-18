const express = require("express");
const {
  findAll,
  findById,
  create,
  update,
  deleteById,
} = require("../controllers/tutoring-feedback.controller");
const tutoringFeedbackRoutes = express.Router();

/**
 * Mô tả router
 */
tutoringFeedbackRoutes.get("/", findAll);
tutoringFeedbackRoutes.get("/:id", findById);
tutoringFeedbackRoutes.post("/", create);
tutoringFeedbackRoutes.put("/:id", update);
tutoringFeedbackRoutes.delete("/:id", deleteById);

module.exports = tutoringFeedbackRoutes;
