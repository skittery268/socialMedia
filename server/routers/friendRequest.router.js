// Modules
const express = require("express");

// Middlewares
const protect = require("../middlewares/auth.middleware");
const checkBan = require("../middlewares/checkBan.middleware");

// Controllers
const { getUserFriendRequests, sendFriendRequest, cancelFriendRequest, rejectFriendRequest, acceptFriendRequest } = require("../controllers/friendRequest.controller");

const friendRequestRouter = express.Router();

// Route to get all user friend requests
friendRequestRouter.get("/get-friend-requests", protect, checkBan, getUserFriendRequests);
// Route to send new friend request
friendRequestRouter.post("/send-friend-request/:to", protect, checkBan, sendFriendRequest);
// Route to cancel friend request
friendRequestRouter.delete("/cancel-friend-request/:friendRequestId", protect, checkBan, cancelFriendRequest);
// Route to reject friend request
friendRequestRouter.delete("/reject-friend-request/:friendRequestId", protect, checkBan, rejectFriendRequest);
// Route to accept friend request
friendRequestRouter.get("/accept-friend-request/:friendRequestId", protect, checkBan, acceptFriendRequest);

module.exports = friendRequestRouter;