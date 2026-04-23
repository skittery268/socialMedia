// Modules
const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    content: {
        type: String,
        required: [true, "Post content is required!"]
    },
    authorId: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, "Author ID is required!"],
        ref: "User"
    },
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
    }],
    images: [{
        type: String
    }]
});

const Post = mongoose.model("Post", postSchema);

module.exports = Post;