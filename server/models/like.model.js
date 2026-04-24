// Modules
const mongoose = require("mongoose");

const likeSchema = new mongoose.Schema({
    authorId: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, "Author ID is required!"]
    },
    postId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post"
    },
    commentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment"
    }
}, { timestamps: true });

const Like = mongoose.model("Like", likeSchema);

module.exports = Like;