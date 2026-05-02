// Moduls
const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema({
    user1: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, "First user ID is required!"],
        ref: "User"
    },
    user2: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, "Second user ID is required!"],
        ref: "User"
    }
}, { timestamps: true });

const Chat = mongoose.model("Chat", chatSchema);

module.exports = Chat;