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
app.use('/static/login/1', require('./api/login'));
app.use('/static/register/1', require('./api/User'));
app.use('/static/trip/1', require('./api/TripBook'));
app.use('/static/login', express.static(path.join(__dirname, 'views', 'travel', 'login')));
app.use('/static/register', express.static(path.join(__dirname, 'views', 'travel', 'register')));
app.use('/static', express.static(path.join(__dirname, 'views', 'travel')));


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})