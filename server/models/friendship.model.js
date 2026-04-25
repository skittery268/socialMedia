// Modules
const mongoose = require("mongoose");

const friendshipSchema = new mongoose.Schema({
    user1: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "User 1 is required!"]
    },
    user2: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "User 2 is required!"]
    }
}, { timestamps: true });

const Friendship = mongoose.model("Friendship", friendshipSchema);

module.exports = Friendship;