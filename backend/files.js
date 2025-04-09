const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const cloudinary = require("cloudinary").v2;
const fileRoutes = require("./routes/file.routes.js"); // Importing Routes

dotenv.config();
const app = express();

// Middleware
app.use(cors({
    origin: "*",
    credentials: true
}));
app.use(express.json());

// Connect to MongoDB
require("./config/db.js");

// Auth Middleware
const authToken = require("./middlewares/auth.middleware.js");
app.use(authToken);

// Cloudinary Config
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Routes
app.use("/api/files", fileRoutes);


app.listen(process.env.FILE_UPLOAD_PORT, () => console.log(`Server running on port ${process.env.FILE_UPLOAD_PORT}`));
