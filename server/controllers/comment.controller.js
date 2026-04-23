// Models
const Comment = require("../models/comment.model");
const Post = require("../models/post.model");

// Utils
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

// Controller to add new comment in post
const addCommentInPost = catchAsync(async (req, res, next) => {
    const { content } = req.body;
    const { postId } = req.params;

    const post = await Post.findById(postId);

    if (!post) {
        return next(new AppError("Post not found!", 404));
    }

    const comment = await Comment.create({ content, authorId: req.user._id });

    post.comments.push(comment._id);

    await post.save();

    res.status(201).json({
        status: "success",
        message: "New comment successfully added!",
        data: {
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

    if (comment.authorId.toString() != req.user._id.toString()) {
        return next(new AppError("You cant delete this post!", 401));
    }

    await Comment.findByIdAndDelete(commentId);

    post.comments = post.comments.filter(com => com._id.toString() != commentId);

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
            post
        }
    })
});

// Controller to like comment
const likeComment = catchAsync(async (req, res, next) => {
    const { commentId, postId } = req.params;

    const comment = await Comment.findById(commentId);
    const post = await Post.findById(postId);
    
    if (!comment) {
        return next(new AppError("Comment not found!", 404));
    }

    comment.likes.push(req.user._id);

    await comment.save();

    res.status(200).json({
        status: "success",
        message: "Comment liked successfully!",
        data: {
            post
        }
    })
})

module.exports = { addCommentInPost, deleteComment, editComment, likeComment };