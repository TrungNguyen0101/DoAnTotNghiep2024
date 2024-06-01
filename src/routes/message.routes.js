const express = require("express");

const {
  getMessageById,
  getAllMessagesBySenderIdAndReceiverId,
} = require("../controllers/message.controller");

const messageRoutes = express.Router();

messageRoutes.get("/:id", getMessageById);
messageRoutes.get("/", getAllMessagesBySenderIdAndReceiverId);

module.exports = messageRoutes;
