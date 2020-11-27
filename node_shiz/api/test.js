const express = require('express');
const mongoose = require('mongoose');
const User = require('../DB/User');
const route = express.Router();

const htmlCode = "<form METHOD='\"post\"' action=\"/api/test/middle\">\n" +
    "    <input type=\"text\" id=\"data\">\n" +
    "    <input type=\"text\" id=\"data2\">\n" +
    "    <button type=\"submit\">Submit</button>\n" +
    "</form>";

route.post('/middle', (req, res, next) => {
    const {data, data2} = req.body;
    res.json({data, data2});
    console.log(data, data2);
});
route.get('/', (req, res, next) => {
  res.send(htmlCode);
});

module.exports = route;