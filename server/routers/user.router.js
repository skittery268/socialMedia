// Modules
const express = require("express");

// Middlewares
const protect = require("../middlewares/auth.middleware");
const checkBan = require("../middlewares/checkBan.middleware");

// Controllers
const { editUserInfo } = require("../controllers/user.controller");

const userRouter = express.Router();

// Route to edit user info
userRouter.patch("/edit-info", protect, checkBan, editUserInfo);

module.exports = userRouter;