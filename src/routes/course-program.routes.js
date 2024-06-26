const express = require("express");
const {
  create,
  update,
  deleteById,
  createPhase,
  updatePhase,
  deletePhaseById,
  urlVideo,
} = require("../controllers/course-program.controller");
const courseProgramRoutes = express.Router();

courseProgramRoutes.post("/", create);
courseProgramRoutes.get("/video", urlVideo);
courseProgramRoutes.put("/:id", update);
courseProgramRoutes.delete("/:id", deleteById);

courseProgramRoutes.post("/phase/", createPhase);
courseProgramRoutes.put("/phase/:id", updatePhase);
courseProgramRoutes.delete("/phase/:id", deletePhaseById);

module.exports = courseProgramRoutes;
