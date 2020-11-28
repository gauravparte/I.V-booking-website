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

let email_ = "";
let To = "";

app.post('/send', (req, res) => {
    let {data1} =  req.body;
    data = data1;
    res.send(data);
});

app.get('/get',(req, res) => {
    res.send(data);
});

app.get('/static/packages', (req, res) => {

   res.render('packages', {package :{packageName : 'PUNE30', Destination: "Pune",comapany: "HTC", price : 10000, description: "Delhi"}});
});


app.use('/api/test', require('./api/test'));
app.use('/api/makepackage', require('./api/makePackages'));
//app.use('/api/login/1', require('./api/login'));
app.use('/api/register/1', require('./api/User'));
app.use('/api/admin-panel', require('./api/admin-panel'));
//app.use('/api/trip/1', require('./api/TripBook'));
app.use('/static/register', (req, res) => {
    res.render(path.join(__dirname, 'views', 'travel','register'))
});
app.use('/static/login', (req, res) => {
    res.render(path.join(__dirname, 'views', 'travel','login'))
});
app.use('/static', express.static(path.join(__dirname, 'views', 'travel')));
app.use('/static', express.static(path.join(__dirname, 'views')));

app.post('/api/login/1', (req,res, next) => {
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
        email_ = emailId;
        console.log(email_);
        console.log(`${user.firstName} logged in.`);
    })
});

app.post('/api/trip/1', (req, res) => {
    const {emailId, From, To, Departs, Returns, NoOfStudents, NoOfFaculties} = req.body;
    User.findOne({emailId}).then((user) => {
        console.log(From);
        email_ = emailId;
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


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});