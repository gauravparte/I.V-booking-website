const mongoose = require('mongoose');
const URI = "mongodb+srv://dbUser:dbUser@cluster0.wi92w.mongodb.net/dbTest?retryWrites=true&w=majority"

const connectDB = async() => {
   await mongoose.connect(URI, { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true});
   console.log('db Connected :)');
};

module.exports = connectDB;