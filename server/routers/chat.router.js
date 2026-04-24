// Modules
const express = require("express");

// Middlewares
const protect = require("../middlewares/auth.middleware");
const checkBan = require("../middlewares/checkBan.middleware");

// Controllers
const { getChats, createChat, deleteChat } = require("../controllers/chat.controller");

const chatRouter = express.Router();

// Route to get all user chats
chatRouter.get("/get-chats/:user2", protect, checkBan, getChats);
// Route to create new chat with any user
chatRouter.post("/create-chat/:user2", protect, checkBan, createChat);
// Route to delete chat
chatRouter.delete("/delete-chat/:chatId", protect, checkBan, deleteChat);

module.exports = chatRouter;