// Modules
const express = require("express");

// Middlewares
const protect = require("../middlewares/auth.middleware");
const checkBan = require("../middlewares/checkBan.middleware");

// Controllers
const { getAllFriends, removeFriend } = require("../controllers/friendship.controller");

const friendshipRouter = express.Router();

// Route to get all user friends
friendshipRouter.get("/get-friends", protect, checkBan, getAllFriends);
// Route to delete friend
friendshipRouter.delete("/remove-friend/:friendshipId", protect, checkBan, removeFriend);

module.exports = friendshipRouter;