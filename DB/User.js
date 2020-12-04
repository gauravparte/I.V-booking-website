const mongoose = require('mongoose');


const user = new mongoose.Schema({
        firstName: {
            type: String
        },
        lastName: {
            type: String
        },
        emailId: {
            type: String,
            unique: true
        },
        username: {
            type: String,
            unique: true
        },
        password: {
            type:String
        },
        loggedInStatus: {
            type: Boolean,
            Default: "false"
        },
        From: {
            type: String
        },
        To: {
            type: String
        },
        Departs: {
            type: Date
        },
        Returns: {
            type: Date
        },
        NoOfStudents: {
            type: Number
        },
        NoOfFaculties: {
            type: Number
        }
    }
);

module.exports = User = mongoose.model('user', user);