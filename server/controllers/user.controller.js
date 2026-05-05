// Models
const cloudinary = require("../config/cloudinary");
const User = require("../models/user.model");
const AppError = require("../utils/appError");

// Utils
const catchAsync = require("../utils/catchAsync");
const uploadToCloudinary = require("../utils/uploadToCloudinary");
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

    if (user.image.url) {
        await cloudinary.uploader.destroy(user.image.public_id);

        user.image = undefined;

        await user.save();
    }

    if (req.file) {
        const result = await uploadToCloudinary(req.file.buffer, "usersAvatars");

        user.image = {
            url: result.secure_url,
            public_id: result.public_id
        }
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

// Controller to delete user avatar
const deleteAvatar = catchAsync(async (req, res, next) => {
    const user = await User.findById(req.user._id);

    if (!user) {
        return next(new AppError("User not found!", 404));
    }

    if (!user.image) {
        return next(new AppError("User dont have avatar!", 400));
    }

    await cloudinary.uploader.destroy(user.image.public_id);

    user.image = undefined;

    await user.save();

    res.status(200).json({
        status: "success",
        message: "Avatar deleted successfully!",
        data: {
            user
        }
    })
});

module.exports = { getUser, editUserInfo, deleteAvatar };