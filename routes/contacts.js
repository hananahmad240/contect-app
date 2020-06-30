const express = require('express');




// creat route
const router = express.Router();

// GET api/contacts
// get all user contacts
// Private
router.get('/', (req, res) => {
    res.send('get all contacts')
});



// POST api/contacts
// add new contacts
// Private
router.post('/', (req, res) => {
    res.send('add contacts')
});


// PUT api/contacts/:id
// update contacts
// Private
router.put('/:id', (req, res) => {
    res.send('update contacts')
});



// DELETE api/contacts/:id
// delete contacts
// Private
router.delete('/:id', (req, res) => {
    res.send('delete contacts')
});


// exports
module.exports = router;