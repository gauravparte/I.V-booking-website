const express = require('express');
const mongoose = require('mongoose');
const User = require('../DB/User');
const route = express.Router();

route.post('/', (req, res) => {
    console.log('');
    const {emailId, From, To, Departs, Returns, NoOfStudents, NoOfFaculties} = req.body;
        User.findOne({emailId}).then((user) => {
            if(!user) return res.send('The user does not exists!');
            else if(user.loggedInStatus == false) return res.send('Please login first');

        else {
            user.From = From;
            user.To = To;
            user.Departs = Departs;
            user.Returns = Returns;
            user.NoOfStudents = NoOfStudents;
            user.NoOfFaculties = NoOfFaculties;
            let userModel = User(user);
            userModel.save().then(res.json({message: "Trip booked successfully!", userModel}))
        }
    })
});

module.exports = route;