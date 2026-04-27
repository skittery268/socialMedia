// Models
const User = require("../models/user.model");

// Utils
const catchAsync = require("../utils/catchAsync");

// Controller to get user by id
const getUser = catchAsync(async (req, res, next) => {
    const { id } = req.params;

    const user = await User.findById(id);

    res.status(200).json({
        status: "success",
        message: "User returned successfully!",
        data: {
            user
        }
    })
});

// Controller to edit user info
const editUserInfo = catchAsync(async (req, res, next) => {
    const { userId } = req.params;
    const { name, email, password } = req.body;

    const user = await User.findById(userId);

    if (name) user.name = name;
    if (email) user.email = email;
    if (password) user.password = password;

    await user.save();

    user.password = undefined;

    res.status(200).json({
        status: "success",
        message: "User info edited successfully!",
        data: {
            user
        }
    })
});

module.exports = { getUser, editUserInfo };