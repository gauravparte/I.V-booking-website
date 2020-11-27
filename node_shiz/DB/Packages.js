const mongoose = require('mongoose');

const packages = new mongoose.Schema({
    packageName: {
        type: String
    },
    description:{
      type: String
    },
    companyName: {
        type: String
    },
    destination: {
        type: String
    },
    price: {
        type: Number
    }
});

module.exports = Package = mongoose.model('packages', packages);