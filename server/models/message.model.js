const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
    content: {
        type: String,
        required: [true, "Message content is required!"]
    },
    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "Sender ID is required!"]
    },
    chatId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Chat"
    },
    groupId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Group"
    }
}, { timestamps: true });

const Message = mongoose.model("Message", messageSchema);

module.exports = Message;