const mongoose = require("mongoose");

const fileSchema = new mongoose.Schema({
    fileName: String,
    fileUrl: String,
    uploadedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("File", fileSchema);
