// Modules
const mongoose = require("mongoose");

const groupSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Group name is required!"]
    },
    members: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],
    admins: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],
    moderators: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],
    private: {
        type: Boolean,
        default: false,
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "Owner ID is required!"]
    }
}, { timestamps: true });

const Group = mongoose.model("Group", groupSchema);

module.exports = Group;