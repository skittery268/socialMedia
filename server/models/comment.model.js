// Modules
const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
    content: {
        type: String,
        required: [true, "Comment content is required!"],
    },
    authorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "Author ID is required!"]
    },
    postId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
        required: [true, "Post ID is required!"]
    },
    likeCount: {
        type: Number,
        default: 0
    }
}, { timestamps: true });

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;