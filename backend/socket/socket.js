import { Server } from 'socket.io';
import http from 'http';
import express from 'express';

const app = express();

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: ["http://localhost:3000"],  // Replace with your frontend URL if deployed
        methods: ["GET", "POST"],
    },
});

const userSocketMap = {}; // { userId: socketId }

export const getReceiverSocketId = (receiverId) => {
    return userSocketMap[receiverId];
};

io.on('connection', (socket) => {
    console.log('A user connected', socket.id);

    const userId = socket.handshake.query.userId;

    if (userId) {
        userSocketMap[userId] = socket.id;
        io.emit('getOnlineUsers', Object.keys(userSocketMap));
    } else {
        console.log('User ID is undefined or missing');
    }

    socket.on('disconnect', () => {
        console.log('User disconnected', socket.id);
        const userIdToRemove = Object.keys(userSocketMap).find(key => userSocketMap[key] === socket.id);
        if (userIdToRemove) {
            delete userSocketMap[userIdToRemove];
            io.emit('getOnlineUsers', Object.keys(userSocketMap));
        }
    });
});

export { app, io, server };
