const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
    content: {
        type: String,
        required: [true, "Message content is required!"]
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