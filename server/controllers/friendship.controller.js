// Models
const Friendship = require("../models/friendship.model");

// Utils
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

// Controller to get all user friends
const getAllFriends = catchAsync(async (req, res, next) => {
    const friendships = await Friendship.find({
        $or: [
            { user1: req.user._id },
            { user2: req.user._id }
        ]
    })

    await Promise.all(friendships.map(fr => fr.populate(["user1", "user2"])));

    res.status(200).json({
        status: "success",
        message: "Friendships successfully returned!",
        data: {
            friendships
        }
    })
});

// Controller to remove friend
const removeFriend = catchAsync(async (req, res, next) => {
    const { friendshipId } = req.params;

    const friendship = await Friendship.findById(friendshipId);

    if (!friendship) {
        return next(new AppError("Friend ship not found!", 404));
    }

    if (friendship.user1.toString() != req.user._id && friendship.user2.toString() != req.user._id) {
        return next(new AppError("You cant delete this friend!", 401));
    }

    await Friendship.findByIdAndDelete(friendshipId);

    req.io.to(friendship.user1.toString()).to(friendship.user2.toString()).emit("remove-friend", friendshipId);

    res.status(200).json({
        status: "success",
        message: "Friend successfully deleted!"
    })
});

module.exports = { getAllFriends, removeFriend };