// Models
const Group = require("../models/group.model");
const Message = require("../models/message.model");

// Utils
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

// Controller to get all user groups
const getGroups = catchAsync(async (req, res, next) => {
    const groups = await Group.find({ members: { $in: [req.user._id] } });
    
    res.status(200).json({
        status: "success",
        message: "Groups returned successfully!",
        data: {
            groups
        }
    })
});

// Controller to join group
const joinGroup = catchAsync(async (req, res, next) => {
    const { memberId, groupId } = req.params;

    const group = await Group.findById(groupId);

    if (!group) {
        return next(new AppError("Group not found!", 404));
    }

    group.members.push(memberId);

    await group.save();

    res.status(200).json({
        status: "success",
        message: "You successfully joined to group!",
        data: {
            group
        }
    })
})

// Controller to leave from group
const leaveGroup = catchAsync(async (req, res, next) => {
    const { memberId, groupId } = req.params;

    const group = await Group.findById(groupId);

    if (!group) {
        return next(new AppError("Group not found!", 404));
    }

    group.members = group.members.filter(member => member.toString() != memberId.toString());

    await group.save();

    res.status(200).json({
        status: "success",
        message: "You successfully leave from this group!",
        data: {
            group
        }
    })
})

// Controller to create new group
const createGroup = catchAsync(async (req, res, next) => {
    const { name } = req.body;

    const group = await Group.create({ name, members: [req.user._id], owner: req.user._id });

    res.status(200).json({
        status: "success",
        message: "Group created successfully!",
        data: {
            group
        }
    })
});

// Controller to delete group
const deleteGroup = catchAsync(async (req, res, next) => {
    const { groupId } = req.params;

    const group = await Group.findById(groupId);

    if (!group) {
        return next(new AppError("Group not found!", 404));
    }

    if (group.owner.toString() != req.user._id.toString()) {
        return next(new AppError("You cant delete this group!", 401));
    }

    await Message.deleteMany({ groupId });

    await Group.findByIdAndDelete(groupId);

    res.status(200).json({
        status: "success",
        message: "Group deleted successfully!"
    })
});

// Controller to edit group
const editGroup = catchAsync(async (req, res, next) => {
    const { groupId } = req.params;
    const { name } = req.body;

    const group = await Group.findById(groupId);

    if (!group) {
        return next(new AppError("Group not found!", 404));
    }

    if (group.owner.toString() != req.user._id.toString()) {
        return next(new AppError("You cant edit this group!", 401));
    }

    if (name) group.name = name;

    await group.save();

    res.status(200).json({
        status: "success",
        message: "Group edited successfully!",
        data: {
            group
        }
    })
});

// Controller to add new member in group
const addMember = catchAsync(async (req, res, next) => {
    const { memberId, groupId } = req.params;

    const group = await Group.findById(groupId);

    if (!group) {
        return next(new AppError("Group not found!", 404));
    }

    group.members.push(memberId);

    await group.save();

    res.status(200).json({
        status: "success",
        message: "Member added in group successfully!",
        data: {
            group
        }
    })
});

// Controller to delete member with group
const deleteMember = catchAsync(async (req, res, next) => {
    const { memberId, groupId } = req.params;

    const group = await Group.findById(groupId);

    if (!group) {
        return next(new AppError("Group not found!", 404));
    }

    if (!group.admins.includes(req.user._id)) {
        return next(new AppError("You cant delete members in this group!", 401));
    }

    group.members = group.members.filter(member => member.toString() != memberId.toString());

    await group.save();

    res.status(200).json({
        status: "success",
        message: "Memeber deleted from this group!",
        data: {
            group
        }
    })
});

module.exports = { getGroups, joinGroup, leaveGroup, createGroup, deleteGroup, editGroup, addMember, deleteMember };