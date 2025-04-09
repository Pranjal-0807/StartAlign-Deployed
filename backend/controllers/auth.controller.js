const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
const RefreshToken = require('../models/refreshToken.model');

exports.createUser = async (req, res) => {
    const { name, email, password, gender } = req.body;
    if (!name || !email || !password || !gender) {
        return res.status(400).json({ message: 'All fields are required' });
    }
    const existingUser = await User.findOne({ email });

    if (existingUser) return res.status(400).json({ message: 'User already exists' });

    try {
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            gender
        });
        await newUser.save();
        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.loginUser = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    try {
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

        const userInfo = {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            gender: user.gender
        };
        const tokenData = { user: userInfo };

        const refreshToken = jwt.sign(tokenData, process.env.REFRESH_TOKEN_SECRET);
        const newRefreshToken = new RefreshToken({
            token: refreshToken,
            user: user._id
        });
        await newRefreshToken.save();

        const accessToken = generateToken(tokenData);
        res.status(200).json({ accessToken, refreshToken });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.refreshToken = async (req, res) => {
    const refreshToken = req.body.token;
    if (!refreshToken) return res.status(400).json({ message: 'Access denied, token missing!' });

    try {
        const tokenDoc = await RefreshToken.findOne({ token: refreshToken });
        if (!tokenDoc) return res.status(401).json({ message: 'jwt expired!' });

        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
            if (err) return res.status(403).json({ message: 'Token invalid!' });
            const accessToken = generateToken({ user: decoded.user });
            res.status(200).json({ accessToken });
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.logoutUser = async (req, res) => {
    const refreshToken = req.params.token;
    const tokenDoc = await RefreshToken.findOneAndDelete({ token: refreshToken });

    if (!tokenDoc) return res.status(400).json({ message: 'Invalid token' });

    res.status(200).json({ message: 'Logged out successfully' });
}

exports.getUsernameFromRefreshToken = async (req, res) => {
    const refreshToken = req.body.token;
    if (!refreshToken) return res.status(400).json({ message: 'Access denied, token missing!' });

    try {
        const tokenDoc = await RefreshToken.findOne({ token: refreshToken });
        if (!tokenDoc) return res.status(401).json({ message: 'jwt expired!' });

        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
            if (err) return res.status(403).json({ message: 'Token invalid!' });

            res.status(200).json({ user: user.user });
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

function generateToken(user) {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '10h' });
}
