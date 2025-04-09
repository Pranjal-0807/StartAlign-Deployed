const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    description: {
        type: String,
        trim: true,
        default: ''
    },
    status: {
        type: String,
        trim: true,
        default: 'Pending'
    },
    priority: {
        type: String,
        trim: true,
        default: 'Low'
    },
    due_date: {
        type: Date,
        trim: true,
        default: Date.now
    },
    members: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
}, {
    timestamps: true
});

module.exports = mongoose.model('Project', projectSchema);
