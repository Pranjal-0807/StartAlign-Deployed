const mongoose = require("mongoose");

const subTaskSchema = new mongoose.Schema({
    subTaskName: {
        type: String,
        required: true,
        trim: true
    },
    assignedTo: {
        type: String,
        required: true,
        trim: true
    },
    deadline: {
        type: Date,
        required: true,
        trim: true
    },
    status: {
        type: String,
        trim: true,
        default: "Pending"
    },
    projectId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project'
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('SubTask', subTaskSchema)
