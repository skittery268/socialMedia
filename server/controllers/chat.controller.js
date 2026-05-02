// Models
const Chat = require("../models/chat.model");
const Message = require("../models/message.model");

// Utils
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

// Controller to get all user chats
const getChats = catchAsync(async (req, res, next) => {
    const chats = await Chat.find({
        $or: [
            { user1: req.user._id },
            { user2: req.user._id }
        ]
    });

    await Promise.all(chats.map(async c => await c.populate(["user1", "user2"])));

    res.status(200).json({
        status: "success",
        message: "Chats returned successfully!",
        data: {
            chats
        }
    })
});

// Controller to create new chat
const createChat = catchAsync(async (req, res, next) => {
    const { user2 } = req.params;

    const chat = await Chat.findOne({
        $or: [
            { user1: req.user._id, user2 },
            { user1: user2, user2: req.user._id }
        ]
    })

    if (chat) {
        return next(new AppError("Chat with this users already exists!", 400));
    }

    const newChat = await Chat.create({ user1: req.user._id, user2 });

    await newChat.populate(["user1", "user2"]);

    res.status(200).json({
        status: "success",
        message: "New chat successfully created!",
        data: {
            chat: newChat
        }
    })
});

// Controller to delete chat
const deleteChat = catchAsync(async (req, res, next) => {
    const { chatId } = req.params;

    const chat = await Chat.findById(chatId);

    if (chat.user1.toString() != req.user._id.toString() && chat.user2.toString() != req.user._id.toString()) {
        return next(new AppError("You cant delete this chat!", 401));
    }

    await Message.deleteMany({ chatId: chat._id });

    await Chat.findByIdAndDelete(chat._id);

    res.status(200).json({
        status: "success",
        message: "Chat deleted successfully!"
    })
});

module.exports = { getChats, createChat, deleteChat };