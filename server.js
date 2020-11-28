// const calls for libs
const express = require('express');
const app = express();
const connectDB = require('./DB/Connection');
const path = require('path');
const port = process.env.Port || 3000;
const User = require('./DB/User');
const Packages = require('./DB/Packages');

// defaulr parameters for the backend app
app.set('view engine', 'ejs');
app.use(express.json({ extended: false}));
app.use(express.static('views'));
app.use(express.urlencoded({extended: false}));

//Database Call
connectDB();

let email_ = "";
let To_ = "";

//api calls
app.get('/static/packages', (req, res) => {
    let posts;
    console.log(email_);
    const emailId = email_;
    User.findOne({ emailId }).then((user) => {
        if (!user) return console.log(res.json({message: "The user does not exists!"}));
        console.log(user.emailId);
        To_= user.To;
        console.log(To_);
    });
    if(To_){
        let destination = To_;
        Packages.find({ destination }).then((packages) => {
            console.log(packages);
            res.render("packages.ejs", {data : {
                    posts : packages
                }});
            posts = packages;
        });
    }
    // res.render('posts', {data: {
    //         posts: posts
    //     }});
    //res.render('packages', {package :{packageName : 'PUNE30', Destination: "Pune",comapany: "HTC", price : 10000, description: "Delhi"}});
});
app.use('/api/test', require('./api/test'));
app.use('/api/makepackage', require('./api/makePackages'));
//app.use('/api/login/1', require('./api/login'));
app.use('/api/register/1', require('./api/User'));
app.use('/api/admin-panel', require('./api/admin-panel'));
//app.use('/api/trip/1', require('./api/TripBook'));

app.post('/api/login/1', (req,res, next) => {
    const{emailId, password} = req.body;
    //res.json(req.body);
    User.findOne({ emailId }).then((user) => {
        if (!user) return res.json({message: "The user does not exists!"});
        if (password != user.password) return res.json({message: "invalid password"});
        user.loggedInStatus = true;
        let userModel = User(user);
        userModel.save().then(res.redirect('/static/home')).catch(error  => {
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
            To_ = user.To;
            let userModel = User(user);
            userModel.save().then(res.redirect('/static/packages'))
        }
    })
});


// Static HTML view calls

app.use('/', require('./api/dashboard'));
app.use('/static', express.static(path.join(__dirname, 'views', 'travel')));
app.use('/static', express.static(path.join(__dirname, 'views')));
//
// app.get('/static', (req, res) => {
//         res
// });
app.get('/static/home', (req, res) => {
    res.render('travel/index', {emailId : email_});
});

app.get('/api/userModel', (req, res) => {
  req.render(path.join(__dirname, ''))
});
app.get('/get',(req, res) => {
    res.send(data);
});

app.use('/static/register', (req, res) => {
    res.render(path.join(__dirname, 'views', 'travel','register'))
});
app.use('/static/login', (req, res) => {
    res.render(path.join(__dirname, 'views', 'travel','login'))
});

//testing

app.get('/posts', function(req, res) {
    let posts;
        console.log(email_);
        const emailId = email_;
        User.findOne({ emailId }).then((user) => {
          if (!user) return console.log(res.json({message: "The user does not exists!"}));
          console.log(user.emailId);
          To_= user.To;
          console.log(To_);
        });
        if(To_){
            let destination = To_;
            Packages.find({ destination }).then((packages) => {
                console.log(packages);
                res.render("posts.ejs", {data : {
                        posts : packages
                    }});
                posts = packages;
            });
        }

    // let posts = [
    //     {title: "Post 1", name: "Danny"},
    //     {title: "Post 2", name: "Alex"},
    //     {title: "Post 3", name: "Matt"},
    //     {title: "Post 4", name: "Manny"}
    // ];
    //  posts = [1,2,3];
});

app.get("/", function(req, res) {
    res.render('calc')
});

app.post("/", function(req, res) {
    var num1 = Number(req.body.num1);
    var num2 = Number(req.body.num2);
    var result = num1 + num2 ;

    res.send("Addition - " + result);
});

app.post('/send', (req, res) => {
    let {data1} =  req.body;
    data = data1;
    res.send(data);
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});