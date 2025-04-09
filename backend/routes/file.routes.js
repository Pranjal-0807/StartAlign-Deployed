const multer = require("multer")
const router = require("express").Router();
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary")
const { uploadFile, gelUploadedFiles } = require("../controllers/file.controller");

// Multer Storage for Cloudinary
const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: "uploads",
        format: async (req, file) => "png",
        public_id: (req, file) => file.originalname.split(".")[0],
    },
});

const upload = multer({ storage });

// Get All Uploaded Files
router.get("/", gelUploadedFiles);

// Upload File & Save to MongoDB
router.post("/upload", upload.single("file"), uploadFile);

module.exports = router;
