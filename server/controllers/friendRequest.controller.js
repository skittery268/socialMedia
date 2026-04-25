// Models
const FriendRequest = require("../models/friendRequest.model");
const Friendship = require("../models/friendship.model");

// Utils
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

// Controller to get all user friend requests
const getUserFriendRequests = catchAsync(async (req, res, next) => {
    const friendRequests = await FriendRequest.find({ to: req.user._id });

    res.status(200).json({
        status: "success",
        message: "Friend requests returned successfully!",
        data: {
            friendRequests
        }
    })
});

// Controller to send friend request
const sendFriendRequest = catchAsync(async (req, res, next) => {
    const { to } = req.params;

    const friendRequest = await FriendRequest.findOne({
        $or: [
            { from: req.user._id, to },
            { from: to, to: req.user._id }
        ]
    })

    if (friendRequest) {
        return next(new AppError("Friend request with this users already exists!", 400));
    }

    const newFriendRequest = await FriendRequest.create({ from: req.user._id, to });
    const friendRequestForClient = await newFriendRequest.populate(["from", "to"]);

    req.io.to(to.toString()).emit("new-friend-request", friendRequestForClient)

    res.status(201).json({
        status: "success",
        message: "Friend request successfully sended!",
        data: {
            friendRequest: friendRequestForClient
        }
    })
});

// Controller to cancel friend request
const cancelFriendRequest = catchAsync(async (req, res, next) => {
    const { friendRequestId } = req.params;

    const friendRequest = await FriendRequest.findById(friendRequestId);

    if (!friendRequest) {
        return next(new AppError("Friend request not found!", 404));
    }

    if (friendRequest.from.toString() != req.user._id.toString()) {
        return next(new AppError("You cant cancel this friend request!", 401));
    }

    await FriendRequest.findByIdAndDelete(friendRequestId);

    req.io.to(friendRequest.to.toString()).emit("cancel-friend-request", friendRequestId);

    res.status(200).json({
        status: "success",
        message: "Friend request cenceled!"
    })
});

// Controller to reject friend request
const rejectFriendRequest = catchAsync(async (req, res, next) => {
    const { friendRequestId } = req.params;

    const friendRequest = await FriendRequest.findById(friendRequestId);

    if (!friendRequest) {
        return next(new AppError("Friend request not found!", 404));
    }

    if (friendRequest.to.toString() != req.user._id.toString()) {
        return next(new AppError("You cant reject this friend request!", 401));
    }

    await FriendRequest.findByIdAndDelete(friendRequestId);

    req.io.to(friendRequest.from.toString()).emit("reject-friend-request", friendRequestId);

    res.status(200).json({
        status: "success",
        message: "Friend request rejected!"
    })
});

// Controller to accept friend request
const acceptFriendRequest = catchAsync(async (req, res, next) => {
    const { friendRequestId } = req.params;

    const friendRequest = await FriendRequest.findById(friendRequestId);

    if (!friendRequest) {
        return next(new AppError("Friend request not found!", 404));
    }

    if (friendRequest.to.toString() != req.user._id.toString()) {
        return next(new AppError("You cant accept this friend request!", 401));
    }

    const newFriendship = await Friendship.create({ user1: friendRequest.from, user2: friendRequest.to });
    const friendshipForClient = await newFriendship.populate(["user1", "user2"]);

    await FriendRequest.findByIdAndDelete(friendRequestId);

    req.io.to(friendRequest.from.toString()).emit("accept-friend-request", friendshipForClient);

    res.status(200).json({
        status: "success",
        message: "Friend request accepted!",
        data: {
            friendship: friendshipForClient
        }
    })
});

module.exports = { getUserFriendRequests, sendFriendRequest, cancelFriendRequest, rejectFriendRequest, acceptFriendRequest };