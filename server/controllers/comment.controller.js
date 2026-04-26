// Models
const Comment = require("../models/comment.model");
const Post = require("../models/post.model");

// Utils
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

// Controller to get post comments
const getPostComments = catchAsync(async (req, res, next) => {
    const comments = await Comment.find();

    res.status(200).json({
        status: "success",
        message: "Comments returned successfully!",
        data: {
            comments
        }
    })
});

// Controller to add new comment in post
const addCommentInPost = catchAsync(async (req, res, next) => {
    const { content } = req.body;
    const { postId } = req.params;

    const post = await Post.findById(postId);

    if (!post) {
        return next(new AppError("Post not found!", 404));
    }

    const comment = await Comment.create({ content, authorId: req.user._id, postId });

    post.commentCount += 1;

    await post.save();

    res.status(201).json({
        status: "success",
        message: "New comment successfully added!",
        data: {
            comment,
            post
        }
    })
});

// Controller to delete comment
const deleteComment = catchAsync(async (req, res, next) => {
    const { commentId, postId } = req.params;

    const comment = await Comment.findById(commentId);
    const post = await Post.findById(postId);

    if (!comment || !post) {
        return next(new AppError("Comment or Post not found!", 404));
    }

    if (comment.authorId.toString() != req.user._id.toString() && req.user.role !== "admin") {
        return next(new AppError("You cant delete this comment!", 401));
    }

    await Comment.findByIdAndDelete(commentId);

    post.commentCount -= 1;

    await post.save();

    res.status(200).json({
        status: "success",
        message: "Comment deleted!",
        data: {
            post
        }
    })
});

// Controller to edit comment content
const editComment = catchAsync(async (req, res, next) => {
    const { commentId, postId } = req.params;
    const { content } = req.body;

    const comment = await Comment.findById(commentId);
    const post = await Post.findById(postId);

    if (!comment || !post) {
        return next(new AppError("Comment or Post not found!", 404));
    }

    if (comment.authorId.toString() != req.user._id.toString()) {
        return next(new AppError("You cant delete this post!", 401));
    }

    if (content) comment.content = content;

    await comment.save();

    res.status(200).json({
        status: "success",
        message: "Comment deleted!",
        data: {
            comment
        }
    })
});

module.exports = { getPostComments, addCommentInPost, deleteComment, editComment };