// Models
const Comment = require("../models/comment.model");
const Like = require("../models/like.model");
const Post = require("../models/post.model");

// Utils
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

// Controller to get all likes
const getLikes = catchAsync(async (req, res, next) => {
    const likes = await Like.find();

    res.status(200).json({
        status: "success",
        message: "Likes successfully returned!",
        data: {
            likes
        }
    })
});

// Controller to like post
const likePost = catchAsync(async (req, res, next) => {
    const { postId, authorId } = req.params;

    const post = await Post.findById(postId);

    if (!post) {
        return next(new AppError("Post not found!", 404));
    }

    post.likeCount += 1;

    await post.save();

    const like = await Like.create({ authorId, postId });

    res.status(200).json({
        status: "success",
        message: "Post liked successfully!",
        data: {
            like
        }
    })
});

// Controller to like comment
const likeComment = catchAsync(async (req, res, next) => {
    const { commentId, authorId } = req.params;

    const comment = await Comment.findById(commentId);

    if (!comment) {
        return next(new AppError("Comment not found!", 404));
    }

    comment.likeCount += 1;

    await comment.save();

    await Like.create({ authorId, commentId });

    res.status(200).json({
        status: "success",
        message: "Post liked successfully!",
        data: {
            comment
        }
    })
});

// Controller to un like post / comment
const unLike = catchAsync(async (req, res, next) => {
    const { likeId } = req.params;

    const like = await Like.findById(likeId);

    if (!like) {
        return next(new AppError("Like not found!", 404));
    }
    const post = await Post.findById(like.postId);
    const comment = await Comment.findById(like.commentId);

    if (post) {
        post.likeCount -= 1;

        await post.save();
    }

    if (comment) {
        comment.likeCount -= 1;

        await comment.save();
    }

    await Like.findByIdAndDelete(likeId);

    res.status(200).json({
        status: "success",
        message: "Un Like successfully!"
    })
});

module.exports = { getLikes, likePost, likeComment, unLike };