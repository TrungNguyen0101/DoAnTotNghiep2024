const express = require("express");

const {
  getMessageById,
  getAllMessagesBySenderIdAndReceiverId,
  getMessageRead,
} = require("../controllers/message.controller");

const messageRoutes = express.Router();

messageRoutes.get("/:id", getMessageById);
messageRoutes.get("/read/:id", getMessageRead);
messageRoutes.get("/", getAllMessagesBySenderIdAndReceiverId);

module.exports = messageRoutes;
