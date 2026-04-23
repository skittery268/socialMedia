// Modules
const express = require("express");

// Controllers
const { getPosts, addPost, deletePost, editPost, likePost } = require("../controllers/post.controller");

// Middlewares
const protect = require("../middlewares/auth.middleware");
const checkBan = require("../middlewares/checkBan.middleware");

const postRouter = express.Router();

// Route to get all posts
postRouter.get("/get-posts", getPosts);
// Route to add new post
postRouter.post("/add-post", protect, checkBan, addPost);
// Route to delete user post
postRouter.delete("/delete-post", protect, checkBan, deletePost);
// Route to edit user post
postRouter.patch("/edit-post", protect, checkBan, editPost);
// Route to like user post
postRouter.post("/like-post", protect, checkBan, likePost);

module.exports = postRouter;