const express = require('express');




// creat route
const router = express.Router();


// GET api/auth
// get logged in users
// private
router.get('/', (req, res) => {
    res.send('get loged in user')
});



// POST api/auth
// auth user and get token
// public
router.post('/', (req, res) => {
    res.send('get loged in')
});




// exports
module.exports = router;