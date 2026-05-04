// Models
const Post = require("../models/post.model");
const User = require("../models/user.model");

// Utils
const catchAsync = require("../utils/catchAsync");

// Controller to search posts by content
const searchPosts = catchAsync(async (req, res, next) => {
    const { content } = req.query;

    const posts = await Post.find({ content: { $regex: content, $options: "i" } });

    await Promise.all(posts.map(p => p.populate(["authorId"])));

    res.status(200).json({
        status: "success",
        message: "Posts returned successfully!",
        results: posts.length,
        data: {
            posts
        }
    })
});

// Controller to search users by user name
const searchUsers = catchAsync(async (req, res, next) => {
    const { name } = req.query;

    const users = await User.find({ name: { $regex: name, $options: "i" } });

    res.status(200).json({
        status: "success",
        message: "Users returned successfully!",
        results: users.length,
        data: {
            users
        }
    })
});

module.exports = {  searchPosts, searchUsers };