const File = require("../models/file.model")

exports.uploadFile = async (req, res) => {
    if (!req.file) return res.status(400).json({ message: "File upload failed" });

    try {
        const newFile = new File({
            fileName: req.file.originalname,
            fileUrl: req.file.path, // Cloudinary URL
            uploadedBy: req.user.id
        });

        await newFile.save();
        res.json({ message: "File uploaded successfully!", file: newFile });
    } catch (error) {
        res.status(500).json({ message: "Error saving file", error });
    }
}

exports.getUploadedFiles = async (req, res) => {
    try {
        let files;

        if (req.user.role === 'admin') {
            files = await File.find();
        } else {
            files = await File.find({ uploadedBy: req.user.id });
        }

        res.json(files);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving files", error });
    }
};
