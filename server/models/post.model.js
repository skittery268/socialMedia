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
    likeCount: {
        type: Number,
        default: 0
    },
    commentCount: {
        type: Number,
        default: 0
    },
    images: [{
        url: String,
        public_id: String
    }]
}, { timestamps: true });

const Post = mongoose.model("Post", postSchema);

module.exports = Post;