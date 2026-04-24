// Modules
const express = require("express");

// Middlewares
const protect = require("../middlewares/auth.middleware");
const checkBan = require("../middlewares/checkBan.middleware");

// Controllers
const { getMessages, sendMessage, deleteMessage, editMessage } = require("../controllers/message.controller");

const messageRouter = express.Router();

// Route to get all messages with chat / group
messageRouter.get("/get-messages/:mode/:id", protect, checkBan, getMessages);
// Route to send message in chat / group
messageRouter.post("/send-message/:mode/:id", protect, checkBan, sendMessage);
// Route to delete message
messageRouter.delete("/delete-message/:messageId", protect, checkBan, deleteMessage);
// Route to edit message
messageRouter.patch("/edit-message/:messageId", protect, checkBan, editMessage);

module.exports = messageRouter;