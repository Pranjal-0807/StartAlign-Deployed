const express = require('express');
const { app, server } = require('./socket/socket');
const messageRoutes = require('./routes/message.routes');
const conversationRoutes = require('./routes/conversation.routes');
const authToken = require('./middlewares/auth.middleware');
require("./config/db")

app.use(authToken)

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/message', messageRoutes);
app.use('/api/conversation', conversationRoutes);

server.listen(process.env.CHAT_SERVER_PORT, () => {
    console.log(`Server is running on port ${process.env.CHAT_SERVER_PORT}`);
});
