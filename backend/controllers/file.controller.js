const File = require("../models/file.model")

exports.uploadFile = async (req, res) => {
    if (!req.file) return res.status(400).json({ message: "File upload failed" });

    try {
        const newFile = new File({
            fileName: req.file.originalname,
            fileUrl: req.file.path, // Cloudinary URL
        });

        await newFile.save();
        res.json({ message: "File uploaded successfully!", file: newFile });
    } catch (error) {
        res.status(500).json({ message: "Error saving file", error });
    }
}

exports.gelUploadedFiles = async (req, res) => {
    try {
        const files = await File.find();
        res.json(files);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving files", error });
    }
}
