// Modules
const express = require("express");

// Middlewares
const protect = require("../middlewares/auth.middleware");
const checkBan = require("../middlewares/checkBan.middleware");

// Controllers
const { getGroups, createGroup, deleteGroup, editGroup, addMember, deleteMember } = require("../controllers/group.controller");

const groupRouter = express.Router();

// Route to get all user groups
groupRouter.get("/get-groups", protect, checkBan, getGroups);
// Route to create new group
groupRouter.post("/create-group", protect, checkBan, createGroup);
// Route to delete group
groupRouter.delete("/delete-group/:groupId", protect, checkBan, deleteGroup);
// Route to edit group
groupRouter.patch("/edit-group/:groupId", protect, checkBan, editGroup);
// Route to add new member in group
groupRouter.post("/add-member/:memberId/:groupId", protect, checkBan, addMember);
// Route to delete member with group
groupRouter.delete("/delete-member/:memberId/:groupId", protect, checkBan, deleteMember);

module.exports = groupRouter;