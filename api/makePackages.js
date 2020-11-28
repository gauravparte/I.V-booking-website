const express = require('express');
const mongoose = require('mongoose');
const Package = require('../DB/Packages');
const route = express.Router();

route.post('/', async (req, res) => {
    //console.log("hello");
    let package;
    package = req.body;
    userModel = new Package(package);
    await userModel.save().then(() => {
        console.log(res.json({message: "New package added", userModel}));
    }).catch((e) => {
        console.log(res.json({Error: e}))
    });
    res.json(package);
});

module.exports = route;