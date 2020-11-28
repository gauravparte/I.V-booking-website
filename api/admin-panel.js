const express = require('express');
const mongoose = require('mongoose');
const User = require('../DB/User');
const route = express.Router();

let message = "Logged in succesfully";

route.get('/', (req, res) => {
    message = "Status here"
    res.render('admin-login', {status: ""});
});

route.post('/', (req, res) => {
    console.log('here');
      const {emailId, password} = req.body;
      console.log('happened!' + emailId)
      if (emailId == "admin@admin.com" && password == "admin") {

          res.redirect('https://cloud.mongodb.com/v2/5fa7cb76d370073f14362d56#metrics/replicaSet/5fa7cc75c5df55358537c310/explorer/dbTest/users/find');
      }
      else {
          message = "Wrong Email Id Or Password"
          res.render('admin-login', {status: message});
      }
});
module.exports = route;