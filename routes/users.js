const express = require('express');




// creat route
const router = express.Router();

// @route POST api/users
// register User
// public
router.post('/', (req, res) => {
    res.send('ok')
});




// exports
module.exports = router;