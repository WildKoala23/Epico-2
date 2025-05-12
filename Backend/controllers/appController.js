const Sequelize = require('sequelize')
const App = require('../models/appModel')
const Password = require('../models/passwordModel')
const sequelize = require('../models/db')
const {generateToken} = require('../middleware/authMiddleware')

const controllers = {}

sequelize.sync()

// Generate a token for testing purposes
controllers.generate = async (req, res) => {

    user = await User.findByPk(1);

    try {
        const token = generateToken(user)
        res.json({ success: true, token });
    } catch (err) {
        console.error("Token generation failed:", err);
        res.status(500).json({ success: false, error: "Failed to generate token" });
    }
  };

controllers.listApps = async (req, res) => {
    sucess = false;
    const data = await App.findAll({
    }).then(function (data) {
        sucess = true;
        return data;
    }).catch(err => {
        sucess = false
        return err
    })
    res.json({ sucess: sucess, data: data })
}

controllers.createApp = async (req, res) => {
    sucess = false;
    const { name } = req.body;
    const data = await App.create({
        name: name
    })
    res.json({ sucess: sucess, data: data })
}

controllers.createPass = async (req, res) => {
    success = false;
    const { appid } = req.body;
    const data = await Password.create({
        password: "qwerty12345",
        where: {
            appid: appid
        }
    }).then(function (data) {
        success = true
        return data
    }).catch(err => {
        return err
    })
    res.status(200).json({
        success: success,
        message: "Password created",
        data: data
    })
}

controllers.getPass = async (req, res) => {
    const { appid } = req.params;

    const data = await Password.findAll({
        where: { appid: appid }
    }).then(function (data) {
        return data
    }).catch(err => {
        console.log('Error: ' + err)
        return err
    })

    res.json({ success: true, data: data })
}

controllers.updatePass = async (req, res) => {
    const { appid } = req.params;

    const data = await Password.update({
        password: "Qwerty1234"
    },
    {
        where: { appid: appid }
    }).then(function (data) {
        return data;
    }).catch(err => {
        console.log('Error: ' + err);
        return err;
    })
    res.send({ success: true, data: data, message: "Updated successfully" })
}



module.exports = controllers;