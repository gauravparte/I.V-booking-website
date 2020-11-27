const express = require('express');
const app = express();
const connectDB = require('./DB/Connection');
const path = require('path');
const port = process.env.Port || 3000;

app.set('view engine', 'ejs');
app.use(express.json({ extended: false}));

app.get('/api/userModel', (req, res) => {
  req.render(path.join(__dirname, ''))
});
app.use(express.static('public'));
app.use(express.urlencoded({extended: false}));


connectDB();

app.get("/", function(req, res) {
    res.render('calc')
});

app.post("/", function(req, res) {
    var num1 = Number(req.body.num1);
    var num2 = Number(req.body.num2);
    var result = num1 + num2 ;

    res.send("Addition - " + result);
});

app.use('/api/test', require('./api/test'));
app.use('/api/makepackage', require('./api/makePackages'));
app.use('/api/login/12', require('./api/login'));
app.use('/api/register/1', require('./api/User'));
app.use('/api/admin-panel', require('./api/admin-panel'));
app.use('/api/trip/1', require('./api/TripBook'));
app.use('/static/register', (req, res) => {
    res.render(path.join(__dirname, 'views', 'travel','register'))
});
app.use('/static/login', (req, res) => {
    res.render(path.join(__dirname, 'views', 'travel','login'))
});
app.use('/static', express.static(path.join(__dirname, 'views', 'travel')));
app.use('/static', express.static(path.join(__dirname, 'views')));

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});