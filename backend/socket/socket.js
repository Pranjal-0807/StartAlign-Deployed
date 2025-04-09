require('dotenv').config();
const cors = require('cors');
const http = require('http');
const express = require('express');
const { Server } = require('socket.io');

const app = express();
app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true
}));

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: process.env.CLIENT_URL,
        credentials: true
    }
});

const userSocketMap = {
    // userId : socketId
}

io.on('connection', (socket) => {
    // console.log("User Connected", socket.id);
    const userId = socket.handshake.query.userId;
    if (!userId) return;

    userSocketMap[userId] = socket.id;

    io.emit('onlineUsers', Object.keys(userSocketMap));

    socket.on('disconnect', () => {
        delete userSocketMap[userId];
        io.emit('onlineUsers', Object.keys(userSocketMap));
    })
});

const getSocketId = (userId) => {
    return userSocketMap[userId];
}

module.exports = { app, server, io, getSocketId };
