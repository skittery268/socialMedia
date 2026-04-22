const catchAsync = require("../utils/catchAsync");

const checkBan = catchAsync(async (req, res, next) => {
    const user = req.user;

    if (!user.isBanned) return next();

    if (user.banExpiresIn && user.banExpiresIn > Date.now()) {
        return res.status(403).json({
            status: "fail",
            message: "You are banned!",
            reason: user.banReason
        })
    }

    if (user.banExpiresIn && user.banExpiresIn <= Date.now()) {
        user.isBanned = false;
        user.banExpiresIn = null;
        await user.save();
        return next();
    }

    res.status(403).json({
        status: "fail",
        message: "You are permanently banned!"
    })
})

module.exports = checkBan;