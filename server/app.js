// Modules
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

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

const app = express();

const origin = {
    origin: process.env.CLIENT_URL,
    credentials: true
}

// Helper middleware functions
app.use(express.json());
app.use(cors(origin));
app.use(cookieParser(origin));

// Routers
app.use("/api/auth", authRouter);
app.use("/api/posts", postRouter);
app.use("/api/comments", commentRouter);
app.use("/api/likes", likeRouter);
app.use("/api/chats", chatRouter);
app.use("/api/messages", messageRouter);
app.use("/api/groups", groupRouter);

// Global Error Handler
app.use(globalErrorHandler);

app.listen(process.env.PORT, () => {
    console.log(`Server Running on port ${process.env.PORT}`);

    connectDB();
});