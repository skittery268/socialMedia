const User = require("../models/user.model");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const jwt = require("jsonwebtoken");

const protect = catchAsync(async (req, res, next) => {
    const { authToken } = req.cookie;

    if (!authToken) {
        return next(new AppError("We cant identify you!", 400));
    }

    const payload = await jwt.verify(authToken, process.env.JWT_SECRET);

    if (!payload) {
        return next(new AppError("Your token expires or dont valid!", 400));
    }

    const user = await User.findById(payload.id);

    req.user = user;

    next();
})

module.exports = protect;