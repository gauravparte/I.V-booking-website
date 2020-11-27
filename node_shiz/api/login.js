const express = require('express');
const mongoose = require('mongoose');
const User = require('../DB/User');
const route = express.Router();

route.post('/', (req,res, next) => {
    const{emailId, password} = req.body;
    //res.json(req.body);
    User.findOne({ emailId }).then((user) => {
        if (!user) return res.json({message: "The user does not exists!"});
        if (password != user.password) return res.json({message: "invalid password"});
        user.loggedInStatus = true;
        let userModel = User(user);
        userModel.save().then(res.json({ message: "logged in succesfully!", user})).catch(error  => {
            res.json({error})
        });
        next();
        console.log(`${user.firstName} logged in.`);
    })

});

module.exports = route;