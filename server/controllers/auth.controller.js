const User = require("../models/user.model");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const jwt = require("jsonwebtoken");
const validatePassword = require("../utils/validatePassword");

const sendToken = (res, user) => {
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES });

    res.cookie("authToken", token, {
        maxAge: process.env.COOKIE_EXPIRES * 24 * 60 * 60 * 1000,
        httpOnly: true,
        secure: process.env.NODE_MODE === "dev" ? false : true,
        sameSite: process.env.NODE_MODE === "dev" ? "Lax" : "Strict"
    })

    res.status(200).json({
        status: "success",
        message: "User login successfully!",
        data: {
            user
        }
    })
}

const register = catchAsync(async (req, res, next) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return next(new AppError("All Fields is required!", 400));
    }

    const error = validatePassword(password);

    if (error) {
        return next(new AppError(error, 400));
    }

    const newUser = await User.create({ name, email, password });

    res.status(201).json({
        status: "success",
        message: "User registered successfully!"
    })
})

const login = catchAsync(async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return next(new AppError("All fields is required!", 400));
    }

    const user = await User.findOne({ email });

    if (!user) {
        return next(new AppError("Credentials incorrect!", 400));
    }

    const isPasssowrdValid = await user.comparePassword(password);

    if (!isPasssowrdValid) {
        return next(new AppError("Credentials incorrect!", 400));
    }

    if (user.isBanned) {
        if (user.banExpiresIn && user.banExpiresIn > Date.now()) {
            return next(new AppError(`You are banned, reason: ${user.banReason}`, 403));
        }

        if (user.banExpiresIn && user.banExpiresIn <= Date.now()) {
            user.isBanned = false;
            user.banExpiresIn = null;
            await user.save();
        } else {
            return next(new AppError("You are permanently banned!", 403));
        }
    }

    sendToken(res, user);
})

const logout = catchAsync(async (req, res, next) => {
    res.clearCookie("authToken");

    res.status(200).json({
        status: "success",
        message: "User logged out successfully!"
    })
})

const getMe = catchAsync(async (req, res, next) => {
    const user = await User.findById(req.user._id);

    res.status(200).json({
        status: "success",
        message: "Auto login successfully!",
        data: {
            user
        }
    })
})

module.exports = { register, login, logout, getMe };