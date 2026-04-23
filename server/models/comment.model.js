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
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }]
})

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;