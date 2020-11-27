const express = require('express');
const mongoose = require('mongoose');
const User = require('../DB/User');
const route = express.Router();

// route.post('/', async(req,res, next) => {
//     const{firstName, lastName, emailId, password, loggedInStatus} = req.body;
//     let user = {};
//     user.firstName = firstName;
//     user.lastName = lastName;
//     user.emailId = emailId;
//     user.password = password;
//     user.loggedInStatus = loggedInStatus;
//     let userModel = new User(user);
//     await userModel.save().then((user) => {
//             res.redirect('/static').json({message: "New user added!", userModel})
//         }
//     ).catch((e) => {
//         res.json({message: "An error occurred!", e})
//     });
// });

route.post('/', async(req,res, next) => {
    const{firstName, lastName, emailId, password, loggedInStatus} = req.body;
    let user = req.body;
    let userModel = new User(user);
    await userModel.save().then((user) => {
            res.json({message: "New user added!", userModel})
        }
    ).catch((e) => {
        res.json({message: "An error occurred!", e})
    });
});


module.exports = route;