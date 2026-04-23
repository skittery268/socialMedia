// Modules
const express = require("express");

// Controllers
const { addCommentInPost, deleteComment, editComment, likeComment } = require("../controllers/comment.controller");

// Middlewares
const protect = require("../middlewares/auth.middleware");
const checkBan = require("../middlewares/checkBan.middleware");

const commentRouter = express.Router();

// Route to add new comment in post
commentRouter.post("/add-comment", protect, checkBan, addCommentInPost);
// Route to delete comment from post
commentRouter.delete("/delete-comment", protect, checkBan, deleteComment);
// Route to edit comment
commentRouter.patch("/edit-comment", protect, checkBan, editComment);
// Route to like comment
commentRouter.post("/like-comment", protect, checkBan, likeComment);

module.exports = commentRouter;