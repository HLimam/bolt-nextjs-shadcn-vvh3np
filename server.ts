#!/usr/bin/env node

import { createServer } from 'http';
import { Server } from 'socket.io';
import { parse } from 'url';
import next from 'next';
import type { Message } from './src/domain/model/Message.js';
import type { Notification } from './src/domain/model/Notification.js';

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();
const port = process.env.PORT || 3030;

app.prepare().then(() => {
  const server = createServer((req, res) => {
    if (!req.url) return;
    const parsedUrl = parse(req.url, true);
    handle(req, res, parsedUrl);
  });

  const io = new Server(server, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST'],
    },
  });

  // Store connected users
  const connectedUsers = new Map<string, string>(); // userId -> socketId

  io.on('connection', (socket) => {
    console.log('Client connected');

    const userId = socket.handshake.query.userId as string;
    if (userId) {
      connectedUsers.set(userId, socket.id);
      console.log(`User ${userId} connected`);
    }

    // Handle chat messages
    socket.on('message', (message: Message) => {
      // Send message to recipient
      const recipientSocketId = connectedUsers.get(message.recipientId);
      if (recipientSocketId) {
        io.to(recipientSocketId).emit('message', message);
      }

      // Send message back to sender for confirmation
      socket.emit('message:sent', message);
    });

    // Handle notifications
    socket.on('notification', (notification: Notification) => {
      const recipientId = notification.userId;
      const recipientSocketId = connectedUsers.get(recipientId);

      if (recipientSocketId) {
        io.to(recipientSocketId).emit('notification', notification);
      }
    });

    // Handle typing indicators
    socket.on('typing:start', (data: { conversationId: string; userId: string }) => {
      const otherParticipants = Array.from(connectedUsers.entries())
        .filter(([id]) => id !== data.userId);

      otherParticipants.forEach(([_, socketId]) => {
        io.to(socketId).emit('typing:start', data);
      });
    });

    socket.on('typing:stop', (data: { conversationId: string; userId: string }) => {
      const otherParticipants = Array.from(connectedUsers.entries())
        .filter(([id]) => id !== data.userId);

      otherParticipants.forEach(([_, socketId]) => {
        io.to(socketId).emit('typing:stop', data);
      });
    });

    // Handle user presence
    socket.on('presence:online', (userId: string) => {
      const userSocketId = connectedUsers.get(userId);
      if (userSocketId) {
        io.emit('presence:online', userId);
      }
    });

    socket.on('presence:offline', (userId: string) => {
      io.emit('presence:offline', userId);
    });

    socket.on('disconnect', () => {
      if (userId) {
        connectedUsers.delete(userId);
        io.emit('presence:offline', userId);
        console.log(`User ${userId} disconnected`);
      }
    });
  });

  server.listen(port, () => {
    console.log(`> Ready on http://localhost:${port}`);
  });
});