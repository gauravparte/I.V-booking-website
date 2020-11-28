const express = require('express');
const mongoose = require('mongoose');
const User = require('../DB/User');
const route = express.Router();

let email_ = "partegaurav13@gmail.com";

route.get('/static/dashboard', (req, res) => {
    // const emailId = email_;
    // console.log(emailId);
    // User.findOne({ email_ }).then((user) => {
    //     if (!user) res.send('user not found');
    //     if (user) res.send('fuck yeah')
    // });
    console.log(email_);
    const emailId = email_;
    User.findOne({ emailId }).then((user) => {
        if (!user) return console.log(res.json({message: "The user does not exists!"}));
        else {
            res.render('dashboard.ejs', {user});
            console.log(user);
        }
    });
});

module.exports = route;