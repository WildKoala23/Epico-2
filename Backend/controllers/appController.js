const Sequelize = require('sequelize')
const App = require('../models/appModel')
const sequelize = require('../models/db')
const { generateToken } = require('../middleware/authMiddleware')
const User = require('../models/userModel')
const Password = require('../models/passwordModel')

const controllers = {}

// Generate a token for testing purposes
controllers.generate = async (req, res) => {

    user = await User.findByPk(1);
    app = await App.findByPk(1);

    console.log(app)

    try {
        const token = await generateToken(user)
        console.log("User token:")
        console.log(token)
        res.json({ success: true, message: token });
    } catch (err) {
        console.error("Token generation failed:", err);
        res.status(500).json({ success: false, error: "Failed to generate token" });
    }
  };

controllers.listApps = async (req, res) => {
    let success = false;
    try {
        const data = await App.findAll();
        success = true;
        res.status(200).json({ success, data });
    } catch (err) {
        res.status(500).json({ success, message: 'DB error', error: err.message });
    }
}

controllers.createApp = async (req, res) => {
    let success = false;
    const { name } = req.body;

    if (!name || name.trim() === "") {
        return res.status(400).json({ success, message: "No app name provided" });
    }

    try {
        const data = await App.create({ name: name.trim() });
        success = true;
        res.status(201).json({ success, data });
    } catch (err) {
        res.status(500).json({ success, message: 'DB error', error: err.message });
    }
}

controllers.createPass = async (req, res) => {
    const { appid } = req.params;
    const { password } = req.body;

    if (password === "") {
        return res.status(400).json({ success: false, message: "No password inserted" });
    }

    try {
        const data = await Password.create({
            password: password,
            appid: appid
        });

        return res.status(201).json({
            success: true,
            message: "Password created",
            data: data
        });
    } catch (err) {
        console.error('Error creating password:', err);
        return res.status(500).json({
            success: false,
            message: "Error creating password",
            error: err.message
        });
    }
};


controllers.getPass = async (req, res) => {
    const { appid } = req.params;

    try {
        const data = await Password.findAll({ where: { appid } });
        return res.status(200).json({
            success: true,
            data: data
        });
    } catch (err) {
        console.error('Error: ' + err);
        return res.status(500).json({
            success: false,
            message: 'Database error',
            error: err.message
        });
    }
};


controllers.updatePass = async (req, res) => {
    const { appid } = req.params;
    const { password } = req.body;

    if (password === "") {
        return res.status(400).json({ success: false, message: "No password inserted" });
    }

    try {
        const data = await Password.update(
            { password: password },
            { where: { appid: appid } }
        );

        return res.status(200).json({
            success: true,
            data: data,
            message: "Updated successfully"
        });
    } catch (err) {
        console.error('Error: ' + err);
        return res.status(500).json({
            success: false,
            message: "Error updating password",
            error: err.message
        });
    }
};





module.exports = controllers;