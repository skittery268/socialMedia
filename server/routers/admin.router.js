// Models
const express = require("express");

// Middlewares
const protect = require("../middlewares/auth.middleware");
const checkBan = require("../middlewares/checkBan.middleware");

// Controllers
const { getAllUsers, deleteUser, banUser, warnUser, changeRole } = require("../controllers/admin.controller");

const adminRouter = express.Router();

// Route to get all users
adminRouter.get("/get-all-users", protect, checkBan, getAllUsers);
// Route to delete user
adminRouter.delete("/delete-user", protect, checkBan, deleteUser);
// Route to ban user
adminRouter.patch("/ban-user", protect, checkBan, banUser);
// Route to warn user
adminRouter.patch("/warn-user", protect, checkBan, warnUser);
// Route to change user role
adminRouter.patch("/change-role", protect, checkBan, changeRole);

module.exports = adminRouter;