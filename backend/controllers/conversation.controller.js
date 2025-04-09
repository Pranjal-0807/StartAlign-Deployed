const mongoose = require("mongoose");
const User = require("../models/user.model");
const Conversation = require("../models/Conversation.model");

exports.getAllConversation = async (req, res) => {
    const { userId } = req.params;

    try {
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ error: "Invalid user ID format" });
        }

        const conversations = await Conversation.find({
            participants: { $in: [new mongoose.Types.ObjectId(userId)] }
        }).populate({
            path: "participants",
            select: "name email"
        });

        res.status(200).json(conversations);
    } catch (error) {
        console.error("Error in getAllConversation:", error);
        res.status(500).json({ error: error.message });
    }
};

exports.createPrivateConversation = async (req, res) => {
    // const { senderId, receiverId } = req.body;

    const senderId = req.user.id;
    const { receiverId } = req.body;

    try {
        if (!mongoose.Types.ObjectId.isValid(senderId) || !mongoose.Types.ObjectId.isValid(receiverId)) {
            return res.status(400).json({ error: "Invalid user ID format" });
        }

        let conversation = await Conversation.findOne({
            participants: { $size: 2, $all: [senderId, receiverId] }
        }).populate("participants", "name email");

        if (!conversation) {
            conversation = await Conversation.create({ participants: [senderId, receiverId] });
            await conversation.populate("participants", "name email");
            return res.status(200).json(conversation);
        }

        res.status(200).json({ message: "Conversation already exists" });
    } catch (error) {
        console.error("Error in createPrivateConversation:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};
