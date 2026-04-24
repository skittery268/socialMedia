const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema({
    user1: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, "First user ID is required!"]
    },
    user2: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, "Second user ID is required!"]
    }
}, { timestamps: true });

const Chat = mongoose.model("Chat", chatSchema);

module.exports = Chat;