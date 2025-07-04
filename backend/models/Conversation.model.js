const mongoose = require("mongoose")

const ConversationSchema = new mongoose.Schema({
    participants: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    }],
    messages: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Message",
    }],
    // chatName: {
    //     type: String,
    //     required: true,
    // },
}, { timestamps: true });

module.exports = mongoose.model("Conversation", ConversationSchema);
