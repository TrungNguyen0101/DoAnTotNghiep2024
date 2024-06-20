const express = require("express");
const {
  findAll,
  findById,
  create,
  update,
  deleteById,
  updateTutorCertifications,
  updateTutorEducations,
  updateTutorExperience,
  getTutorByUserId,
  findTutorProfileWithUser,
} = require("../controllers/tutor.controller");

const tutorRoutes = express.Router();

tutorRoutes.get("/", findAll);
tutorRoutes.get("/:id", findById);
tutorRoutes.post("/", create);
tutorRoutes.put("/:id", update);
tutorRoutes.delete("/:id", deleteById);
// tutorRoutes.put("/update-tutor-certifications/:id", updateTutorCertifications);
tutorRoutes.put("/update-tutor-educations/:id", updateTutorEducations);
tutorRoutes.put("/update-tutor-experi ence/:id", updateTutorExperience);
tutorRoutes.get("/get-tutor-by-userId/:id", getTutorByUserId);
tutorRoutes.get("/get-user-by-id/:id", findTutorProfileWithUser);

module.exports = tutorRoutes;
