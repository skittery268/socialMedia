// Modules
const express = require("express");

// Middlewares
const protect = require("../middlewares/auth.middleware");
const checkBan = require("../middlewares/checkBan.middleware");

// Controllers
const { editUserInfo, getUser } = require("../controllers/user.controller");

const userRouter = express.Router();

// Route to get user by id
userRouter.get("/get-user/:id", protect, checkBan, getUser);

// Route to edit user info
userRouter.patch("/edit-info", protect, checkBan, editUserInfo);

module.exports = userRouter;