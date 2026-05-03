// Models
const Group = require("../models/group.model");
const Message = require("../models/message.model");

// Utils
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

// Controller to get group / chat messages
const getMessages = catchAsync(async (req, res, next) => {
    const { mode, id } = req.params;

    let messages = [];

    if (mode === "chat") messages = await Message.find({ chatId: id });
    if (mode === "group") messages = await Message.find({ groupId: id });

    await Promise.all(messages.map(m => m.populate("senderId")));

    res.status(200).json({
        status: "success",
        message: "Messages successfully returned!",
        data: {
            messages
        }
    })
});

// Controller to send message in chat / group
const sendMessage = catchAsync(async (req, res, next) => {
    const { mode, id } = req.params;
    const { content } = req.body;

    let newMessage = {};

    if (mode === "chat") newMessage = await Message.create({ content, senderId: req.user._id, chatId: id });
    if (mode === "group") newMessage = await Message.create({ content, senderId: req.user._id, groupId: id });

    const messageForClient = await newMessage.populate("senderId");

    req.io.to(id.toString()).emit("new-message", messageForClient);

    res.status(200).json({
        status: "success",
        message: "Message successfully sended!",
        data: {
            message: messageForClient
        }
    })
});

// Controller to delete message
const deleteMessage = catchAsync(async (req, res, next) => {
    const { mode, messageId } = req.params;

    const message = await Message.findById(messageId);
    let group = {};

    if (mode === "group") group = await Group.findById(message.groupId);

    if (!message) {
        return next(new AppError("Message not found!", 404));
    }

    if (mode === "chat" && message.senderId.toString() != req.user._id.toString()) {
        return next(new AppError("You cant delete this message!", 401));
    }

    if (mode === "group" && !group.moderators.includes(req.user._id) && !group.admins.includes(req.user._id) && group.owner.toString() != req.user._id.toString() && message.senderId.toString() != req.user._id.toString()) {
        return next(new AppError("You cant delete this message!", 401));
    }

    await Message.findByIdAndDelete(messageId);

    req.io.to(mode === "chat" ? message.chatId.toString() : message.groupId.toString()).emit("delete-message", messageId);

    res.status(200).json({
        status: "success",
        message: "Message deleted successfully!"
    })
});

// Controller to edit message
const editMessage = catchAsync(async (req, res, next) => {
    const { mode, messageId } = req.params;
    const { content } = req.body;

    const message = await Message.findById(messageId);

    if (!message) {
        return next(new AppError("Message not found!", 404));
    }

    if (message.senderId.toString() != req.user._id.toString()) {
        return next(new AppError("You cant edit this message!", 401));
    }

    if (content) message.content = content;

    await message.save();
    await message.populate("senderId");

    req.io.to(mode === "chat" ? message.chatId.toString() : message.groupId.toString()).emit("edit-message", message);

    res.status(200).json({
        status: "success",
        message: "Message edited successfully!"
    })
});

module.exports = { getMessages, sendMessage, deleteMessage, editMessage };