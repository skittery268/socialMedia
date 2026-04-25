// Modules
const mongoose = require("mongoose");

const friendRequestSchema = new mongoose.Schema({
    from: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "User 1 is required!"]
    },
    to: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "User 2 is required!"]
    }
}, { timestamps: true });

const FriendRequest = mongoose.model("FriendRequest", friendRequestSchema);

module.exports = FriendRequest;