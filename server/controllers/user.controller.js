// Models
const User = require("../models/user.model");
const AppError = require("../utils/appError");

// Utils
const catchAsync = require("../utils/catchAsync");
const validatePassword = require("../utils/validatePassword");

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
    const { name, email, password } = req.body;

    const user = await User.findById(req.user._id);

    if (name) user.name = name;
    if (email) user.email = email;

    if (password) {
        const error = validatePassword(password);

        if (error) {
            return next(new AppError(error, 400));
        }

        user.password = password;
    }

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