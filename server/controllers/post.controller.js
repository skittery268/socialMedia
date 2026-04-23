// Models
const Post = require("../models/post.model");

// Utils
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

// Controller to get all posts
const getPosts = catchAsync(async (req, res, next) => {
    const posts = await Post.find();

    res.status(200).json({
        status: "success",
        message: "Posts returned successfully!",
        data: {
            posts
        }
    })
})

// Controller to add new post
const addPost = catchAsync(async (req, res, next) => {
    const { content } = req.body;

    if (!content) {
        return next(new AppError("Content is required!", 400));
    }

    const newPost = await Post.create({ content, authorId: req.user._id });

    res.status(201).json({
        status: "success",
        message: "New post successfully added!",
        data: {
            post: newPost
        }
    })
})

// Controller to delete user post
const deletePost = catchAsync(async (req, res, next) => {
    const { postId } = req.params;

    const post = await Post.findById(postId);

    if (!post) {
        return next(new AppError("Post not found!", 404));
    }

    if (post.authorId.toString() != req.user._id.toString()) {
        return next(new AppError("You cant delete this post!", 401));
    }

    await Post.findByIdAndDelete(postId);

    res.status(200).json({
        status: "success",
        message: "Post deleted successfully!"
    })
})

// Controller to edit post content
const editPost = catchAsync(async (req, res, next) => {
    const { postId } = req.params;
    const { content } = req.body;

    const post = await Post.findById(postId);

    if (!post) {
        return next(new AppError("Post not found!", 404));
    }

    if (post.authorId.toString() != req.user._id.toString()) {
        return next(new AppError("You cant edit this post!", 401));
    }

    if (content) post.content = content;

    await post.save();

    res.status(200).json({
        status: "success",
        message: "Post edited successffully!",
        data: {
            post
        }
    })
})

// Controller to like post 
const likePost = catchAsync(async (req, res, next) => {
    const { postId } = req.params;

    const post = await Post.findById(postId);

    if (!post) {
        return next(new AppError("Post not found!", 404));
    }

    post.likes.push(req.user._id);

    await post.save();

    res.status(200).json({
        status: "success",
        message: "Post liked successfully!",
        data: {
            post
        }
    })
})

module.exports = { getPosts, addPost, deletePost, editPost, likePost };