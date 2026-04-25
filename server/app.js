// Modules
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const http = require("http");
const { Server } = require("socket.io");
const jwt = require("jsonwebtoken");

// Utils
const AppError = require("./utils/appError");

// Controllers
const globalErrorHandler = require("./controllers/error.controller");

// Configs
const connectDB = require("./config/mongo.config");

// Routers
const authRouter = require("./routers/auth.router");
const postRouter = require("./routers/post.router");
const commentRouter = require("./routers/comment.router");
const likeRouter = require("./routers/like.router");
const chatRouter = require("./routers/chat.router");
const messageRouter = require("./routers/message.router");
const groupRouter = require("./routers/group.router");
const friendRequestRouter = require("./routers/friendRequest.router");
const friendshipRouter = require("./routers/friendship.router");
const adminRouter = require("./routers/admin.router");

// Servers
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: process.env.CLIENT_URL,
        credentials: true
    }
});

const origin = {
    origin: process.env.CLIENT_URL,
    credentials: true
};

// Helper middleware functions
app.use(express.json());
app.use(cors(origin));
app.use(cookieParser(origin));
app.use((req, res, next) => {
    req.io = io;
    next();
});

// We change socket object, we add property "userId" from user token
io.use((socket, next) => {
    const cookies = socket.handshake.headers.cookie;

    if (!cookies) {
        return next(new AppError("We cant identify you!", 401));
    }

    const token = cookies.split(";").map(c => c.trim()).find(c => c.startsWith("authToken="));

    if (!token) {
        return next(new AppError("We cant identify you!", 401));
    }

    const correctToken = token.split("=")[1];

    const payload = jwt.verify(correctToken, process.env.JWT_SECRET);

    if (!payload) {
        return next(new AppError("Your token expires!", 400));
    }

    socket.userId = payload.id;

    next();
});

// Routers
app.use("/api/auth", authRouter);
app.use("/api/posts", postRouter);
app.use("/api/comments", commentRouter);
app.use("/api/likes", likeRouter);
app.use("/api/chats", chatRouter);
app.use("/api/messages", messageRouter);
app.use("/api/groups", groupRouter);
app.use("/api/friendRequests", friendRequestRouter);
app.use("/api/friendships", friendshipRouter);
app.use("/api/admin", adminRouter);

// Global Error Handler
app.use(globalErrorHandler);

// We on connection event from client
io.on("connection", (socket) => {
    console.log(`User with ${socket.id} id connected to server!`);

    socket.join(socket.userId);

    socket.on("join-chat", (chatId) => {
        socket.join(chatId);
    });

    socket.on("leave-chat", (chatId) => {
        socket.leave(chatId);
    });

    socket.on("join-group-chat", (groupId) => {
        socket.join(groupId);
    });

    socket.on("leave-group-chat", (groupId) => {
        socket.leave(groupId);
    });

    socket.on("disconnect", (reason) => {
        console.log(`User with ${socket.id} id disconnected because ${reason}`);
    });
});

server.listen(process.env.PORT, () => {
    console.log(`Server Running on port ${process.env.PORT}`);

    connectDB();
});