// Models
const User = require("../models/user.model");

// Utils
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

// Controller to get all users
const getAllUsers = catchAsync(async (req, res, next) => {
    const users = await User.find();

    res.status(200).json({
        status: "success",
        message: "Users successfully returned!",
        data: {
            users
        }
    })
});

// Controller to delete user
const deleteUser = catchAsync(async (req, res, next) => {
    const { userId } = req.params;
    
    if (req.user._id.toString() != userId && req.user.role !== "admin") {
        return next(new AppError("You cant delete users!", 401));
    }

    await User.findByIdAndDelete(userId);

    res.status(200).json({
        status: "success",
        message: "User deleted successfully!"
    });
});

// Controller to ban user
const banUser = catchAsync(async (req, res, next) => {
    const { userId } = req.params;
    const { reason, duration } = req.body;

    const user = await User.findById(userId);

    if (!reason || !duration) {
        return next(new AppError("Ban reason and ban duration is required!", 400));
    }

    if (!user) {
        return next(new AppError("User not found!", 404));
    }

    user.isBanned = true;
    user.banReason = reason;
    user.banExpiresIn = new Date(Date.now() + parseInt(duration) * 24 * 60 * 60 * 1000);

    await user.save();

    res.status(200).json({
        status: "success",
        message: "User banned successfully!",
        data: {
            user
        }
    })
});

// Controller to warn user
const warnUser = catchAsync(async (req, res, next) => {
    const { userId } = req.params;
    const { reason, duration } = req.body;

    const user = await User.findById(userId);

    if (!user) {
        return next(new AppError("User not found!", 404));
    }

    if (!reason || !duration) {
        return next(new AppError("Warn reason and warn duration is required!", 400));
    }

    user.warnings.push({ reason, date: new Date(Date.now() + duration * 24 * 60 * 60 * 1000) });

    await user.save();

    if (user.warnings.length >= 3) {
        user.isBanned = true;
        user.banReason = "Auto ban for 3/3 warnings in 10 days";
        user.banExpiresIn = new Date(Date.now() + 10 * 24 * 60 * 60 * 1000);

        user.warnings = [];

        await user.save();
    }

    res.status(200).json({
        status: "success",
        message: "User successfully warning!",
        date: {
            user
        }
    })
});

// Controller to change user role
const changeRole = catchAsync(async (req, res, next) => {
    const { userId } = req.params;

    const user = await User.findById(userId);

    if (!user) {
        return next(new AppError("User not found!", 404));
    }

    if (user.role === "admin") {
        return next(new AppError("You cant change role for admin!", 400));
    }

    user.role = "admin";

    await user.save();

    res.status(200).json({
        status: "success",
        message: "User role successfully changed!",
        data: {
            user
        }
    })
});

module.exports = { getAllUsers, deleteUser, banUser, warnUser, changeRole };