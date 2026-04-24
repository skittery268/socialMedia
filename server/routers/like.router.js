// Modules
const express = require("express");

// Middlewares
const protect = require("../middlewares/auth.middleware");
const checkBan = require("../middlewares/checkBan.middleware");

// Controllers
const { likeComment, likePost, unLike } = require("../controllers/like.controller");

const likeRouter = express.Router();

// Route to like post
likeRouter.post("/like-post/:postId/:authorId", protect, checkBan, likePost);
// Route to like comment
likeRouter.post("/like-comment/:commentId/:authorId", protect, checkBan, likeComment);
// Route to unlike comment / post
likeRouter.delete("/unlike/:likeId", protect, checkBan, unLike);

module.exports = likeRouter;