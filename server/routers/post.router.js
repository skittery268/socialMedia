// Modules
const express = require("express");

// Middlewares
const protect = require("../middlewares/auth.middleware");
const checkBan = require("../middlewares/checkBan.middleware");

// Controllers
const { getPosts, addPost, deletePost, editPost } = require("../controllers/post.controller");

const postRouter = express.Router();

// Route to get all posts
postRouter.get("/get-posts", getPosts);
// Route to add new post
postRouter.post("/add-post", protect, checkBan, addPost);
// Route to delete user post
postRouter.delete("/delete-post/:postId", protect, checkBan, deletePost);
// Route to edit user post
postRouter.patch("/edit-post/:postId", protect, checkBan, editPost);

module.exports = postRouter;