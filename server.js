const express = require('express');
const dotenv = require('dotenv');
const colors = require('colors');
const connectedDB = require('./config/db');

// ---------------------------
dotenv.config({
    path: './config/config.env'
});

// ---------------------------


// create app
const app = express();





// data base connection
connectedDB();

// creat route
// every routes starts with /api
app.use('/api/users', require('./routes/users')); //users routes
app.use('/api/auth', require('./routes/auth')); // auth routes
app.use('/api/contacts', require('./routes/contacts')); // contacts routes




// creat port
const PORT = process.env.PORT || 8000;
const server = app.listen(PORT, () => {
    console.log(`app is running on localhost ${PORT}`);
});

process.on('unhandledRejection', (err, promise) => {
    console.log(err);
    process.exit(1);
});