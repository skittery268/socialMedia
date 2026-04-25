// Models
const Comment = require("../models/comment.model");
const Like = require("../models/like.model");
const Post = require("../models/post.model");

// Configs
const cloudinary = require("../config/cloudinary");

// Utils
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const uploadToCloudinary = require("../utils/uploadToCloudinary");

// Controller to get all posts
const getPosts = catchAsync(async (req, res, next) => {
    const posts = await Post.find();

    await Promise.all(posts.map(p => p.populate("authorId")));

    res.status(200).json({
        status: "success",
        message: "Posts returned successfully!",
        data: {
            posts
        }
    })
});

// Controller to add new post
const addPost = catchAsync(async (req, res, next) => {
    const { content } = req.body;

    if (!content) {
        return next(new AppError("Content is required!", 400));
    }

    const uploadedImages = [];

    if (req.files && req.files.length > 0) {
        for (const file of req.files) {
            const result = await uploadToCloudinary(file.buffer);

            uploadedImages.push({
                url: result.secure_url,
                public_id: result.public_id
            });
        }
    }

    const newPost = await Post.create({ content, authorId: req.user._id, images: uploadedImages });
    await newPost.populate("authorId");

    res.status(201).json({
        status: "success",
        message: "New post successfully added!",
        data: {
            post: newPost
        }
    })
});

// Controller to delete user post
const deletePost = catchAsync(async (req, res, next) => {
    const { postId } = req.params;

    const post = await Post.findById(postId);

    if (!post) {
        return next(new AppError("Post not found!", 404));
    }

    if (post.authorId.toString() != req.user._id.toString() && req.user.role !== "admin") {
        return next(new AppError("You cant delete this post!", 401));
    }

    if (post.images && post.images.length > 0) {
        for (const img of post.images) {
            await cloudinary.uploader.destroy(img.public_id);
        }
    }

    await Post.findByIdAndDelete(postId);

    res.status(200).json({
        status: "success",
        message: "Post deleted successfully!"
    })
});

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
    await post.populate("authorId");

    res.status(200).json({
        status: "success",
        message: "Post edited successffully!",
        data: {
            post
        }
    })
});

module.exports = { getPosts, addPost, deletePost, editPost };