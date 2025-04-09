const Message = require("../models/Message.model");
const Conversation = require("../models/Conversation.model")
const { getSocketId, io } = require("../socket/socket")

exports.sendMessage = async (req, res) => {
    try {
        const senderId = req.user.id;
        const receiverId = req.params.id;
        const message = req.body.message;

        if (!senderId || !receiverId || !message) {
            return res.status(400).json({ message: "Please enter all fields" });
        }

        let conversation = await Conversation.findOne({
            participants: { $size: 2, $all: [senderId, receiverId] }
        })

        if (!conversation) {
            conversation = await Conversation.create({
                participants: [senderId, receiverId],
            })
        }

        const newMessage = await Message.create({
            sender: senderId,
            receiver: receiverId,
            message
        })

        if (newMessage) {
            conversation.messages.push(newMessage._id)
            await conversation.save()
        }

        // socket.io
        const socketId = getSocketId(receiverId)
        io.to(socketId).emit("newMessage", newMessage);

        return res.status(200).json(newMessage)
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
};

exports.getMessageById = async (req, res) => {
    try {
        const myId = req.user.id;
        const otherParticipantId = req.params.id;

        if (!myId || !otherParticipantId) {
            return next(new errorHandler("All fields are required", 400));
        }

        let conversation = await Conversation.findOne({
            participants: { $all: [myId, otherParticipantId] },
        }).populate("messages")

        return res.status(200).json(conversation);
    } catch (err) {
        return res.status(500).json(err);
    }
};
