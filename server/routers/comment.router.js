// Modules
const express = require("express");

// Controllers
const { addCommentInPost, deleteComment, editComment, getPostComments } = require("../controllers/comment.controller");

// Middlewares
const protect = require("../middlewares/auth.middleware");
const checkBan = require("../middlewares/checkBan.middleware");

const commentRouter = express.Router();

// Route to get post comments
commentRouter.get("/get-comments/:postId", getPostComments)
// Route to add new comment in post
commentRouter.post("/add-comment/:postId", protect, checkBan, addCommentInPost);
// Route to delete comment from post
commentRouter.delete("/delete-comment/:commentId/:postId", protect, checkBan, deleteComment);
// Route to edit comment
commentRouter.patch("/edit-comment/:commentId/:postId", protect, checkBan, editComment);

module.exports = commentRouter;