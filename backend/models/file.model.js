const mongoose = require("mongoose");

const fileSchema = new mongoose.Schema({
    fileName: String,
    fileUrl: String,
    uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
},
    {
        timestamps: true,
    });

module.exports = mongoose.model("File", fileSchema);
