const mongoose = require('mongoose');


const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'please add a name']
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'please add a email']
    },
    password: {
        type: String,
        required: [true, 'please add a password']
    },
    date: {
        type: Date,
        default: Date.now()
    },
});

const user = mongoose.model('user', UserSchema, 'user');
module.exports = user;