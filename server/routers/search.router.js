// Modules
const express = require("express");

// Middlewares
const protect = require("../middlewares/auth.middleware");
const checkBan = require("../middlewares/checkBan.middleware");

// Controllers
const { searchPosts, searchUsers } = require("../controllers/search.controller");

const searchRouter = express.Router();

// Route to search posts by content
searchRouter.get("/get-posts", protect, checkBan, searchPosts);
// Route to search users by user name
searchRouter.get("/get-users", protect, checkBan, searchUsers);

module.exports = searchRouter;