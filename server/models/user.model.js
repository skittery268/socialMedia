// Modules
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "User name is required!"]
    },
    email: {
        type: String,
        unique: [true, "User with this email already exists!"],
        required: [true, "User email is required!"]
    },
    password: {
        type: String,
        required: [true, "User password is required!"]
    },
    warnings: [{
        reason: String,
        date: Date
    }],
    isBanned: {
        type: Boolean,
        default: false
    },
    banReason: {
        type: String
    },
    banExpiresIn: {
        type: Date
    }
}, { timestamps: true });

// We hashing user password pre save document
userSchema.pre("save", async function() {
    if (!this.isModified("password")) return;
    this.password = await bcrypt.hash(this.password, 10);
});

// Method to compare user password
userSchema.methods.comparePassword = async function(candidate) {
    return await bcrypt.compare(candidate, this.password);
};

const User = mongoose.model("User", userSchema);

module.exports = User;