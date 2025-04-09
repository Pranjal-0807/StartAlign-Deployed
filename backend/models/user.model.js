const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true,
        enum: ["Male", "Female", "Other"]
    },
    role: {
        type: String,
        default: "User",
        enum: ["User", "Admin", "Manager"]
    },
    avatar: {
        type: String,
        default: function () {
            return this.gender === "Male" ? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdFe2l5yrU1Bd9lao2sMQTAFu0XVbDxk0GVQ&s" : this.gender === "Female" ? "https://i.pinimg.com/1200x/1b/2e/31/1b2e314e767a957a44ed8f992c6d9098.jpg" : "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541";
        }
    },
    projects: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Project"
    }],
    subTasks: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "SubTask"
    }],
    contacts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],
    profilePic: {
        type: String,
        default: function () {
            return this.gender === "Male" ? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdFe2l5yrU1Bd9lao2sMQTAFu0XVbDxk0GVQ&s" : this.gender === "Female" ? "https://i.pinimg.com/1200x/1b/2e/31/1b2e314e767a957a44ed8f992c6d9098.jpg" : "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541";
        }
    },
    bio: {
        type: String,
        default: "Busy, working on my projects!"
    },
}, {
    timestamps: true
});

module.exports = mongoose.model("User", userSchema);
