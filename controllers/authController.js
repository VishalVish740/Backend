const User = require('../models/user');
const jwt = require('jsonwebtoken');

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

// Signup
const signupUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({
                success: 0,
                message: 'User already exists'
            });
        }

        const user = await User.create({ username, email, password });

        if (user) {
            res.status(201).json({
                success: 1,
                message: 'User created successfully',
                data: {
                    _id: user._id,
                    username: user.username,
                    email: user.email,
                    token: generateToken(user._id)
                }
            });
        } else {
            res.status(400).json({
                success: 0,
                message: 'Invalid user'
            });
        }
    } catch (error) {
        res.status(500).json({
            success: 0,
            message: 'Server error'
        });
    }
};

// Login
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (user && await user.matchPassword(password)) {
            res.status(200).json({
                success: 1,
                message: 'Login successful',
                data: {
                    _id: user._id,
                    username: user.username,
                    email: user.email,
                    token: generateToken(user._id)
                }
            });
        } else {
            res.status(401).json({
                success: 0,
                message: 'Invalid email or password'
            });
        }
    } catch (error) {
        res.status(500).json({
            success: 0,
            message: 'Server error'
        });
    }
};

// Forgot Password
const forgotPassword = async (req, res) => {
    try {
        const { email, newPassword } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({
                success: 0,
                message: 'User not found'
            });
        }

        // Check if new password matches old password
        const isSame = await user.matchPassword(newPassword);
        if (isSame) {
            return res.status(400).json({
                success: 0,
                message: 'New password must be different from old password'
            });
        }

        // Update password
        user.password = newPassword;
        await user.save();

        res.status(200).json({
            success: 1,
            message: 'Password updated successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: 0,
            message: 'Server error'
        });
    }
};

module.exports = { signupUser, loginUser, forgotPassword };
