// Models
const express = require("express");

// Middlewares
const protect = require("../middlewares/auth.middleware");
const checkBan = require("../middlewares/checkBan.middleware");

// Controllers
const { getAllUsers, deleteUser, banUser, warnUser, changeRole, getAnalytic, unBunUser } = require("../controllers/admin.controller");
const allowedTo = require("../middlewares/allowedTo.middleware");

const adminRouter = express.Router();

// Route to get all users
adminRouter.get("/get-all-users", protect, checkBan, getAllUsers);
// Route to get analytic for admin
adminRouter.get("/get-analytic", protect, checkBan, getAnalytic);
// Route to delete user
adminRouter.delete("/delete-user/:userId", protect, checkBan, allowedTo("admin"), deleteUser);
// Route to ban user
adminRouter.patch("/ban-user/:userId", protect, checkBan, allowedTo("admin"), banUser);
// Route to unbun user
adminRouter.patch("/unbun/:userId", protect, checkBan, allowedTo("admin"), unBunUser);
// Route to warn user
adminRouter.patch("/warn-user/:userId", protect, checkBan, allowedTo("admin"), warnUser);
// Route to change user role
adminRouter.patch("/change-role/:userId", protect, checkBan, allowedTo("admin"), changeRole);

module.exports = adminRouter;