const mongoose = require('mongoose');


const ContactSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    name: {
        type: String,
        required: [true, 'please add a name']
    },
    email: {
        type: String,
        required: [true, 'please add a email']
    },
    phone: {
        type: String,
    },
    type: { // type of user
        type: String,
        default: 'personal'
    },
    date: {
        type: Date,
        default: Date.now()
    },
});

const contact = mongoose.model('contact', ContactSchema, 'contact');
module.exports = contact;