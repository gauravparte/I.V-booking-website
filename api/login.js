const express = require('express');
const mongoose = require('mongoose');
const User = require('../DB/User');
const route = express.Router();
let email_ = require('../server');

route.post('/', (req,res, next) => {
    const{emailId, password} = req.body;
    //res.json(req.body);
    User.findOne({ emailId }).then((user) => {
        if (!user) return res.json({message: "The user does not exists!"});
        if (password != user.password) return res.json({message: "invalid password"});
        user.loggedInStatus = true;
        let userModel = User(user);
        userModel.save().then(res.redirect('https://www.google.com').catch(error  => {
            res.json({error});
        });
        next();
        email_ = emailId;
        console.log(email_);
        console.log(`${user.firstName} logged in.`);
    })
});

module.exports = route;