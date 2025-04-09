const User = require('../models/user.model');

exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find({ _id: { $ne: req.user.id } }, '-password');
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};