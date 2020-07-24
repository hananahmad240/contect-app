const express = require('express');
const Contact = require('../models/Contact');
const dotenv = require('dotenv');
const {
    authentication
} = require('../middleware/authentication');
const {
    addContactValidation
} = require('../config/validation');
dotenv.config({
    path: './config/config.env'
});



// creat route
const router = express.Router();

// GET api/contacts
// get all user contacts
// Private
router.get('/', authentication, async (req, res, next) => {
    try {
        const contact = await Contact.find({
            user: req.user.id
        }).sort({
            data: -1
        })
        return res.status(200).json({
            success: true,
            data: contact
        })
    } catch (error) {
        return res.status(400).json({
            // success: false,
            msg: error.message
        })
    }
});



// POST api/contacts
// add new contacts
// Private
router.post('/', authentication, async (req, res, next) => {
    const {
        error
    } = addContactValidation(req.body);
    if (error) {
        return res.status(400).json({
            // success: false,
            msg: error.details[0].message
        });
    } else {
        try {
            req.body.user = req.user.id;

            const contact = await Contact.create(req.body);
            return res.status(200).json({
                success: true,
                data: contact
            });
        } catch (error) {
            return res.status(400).json({
                // success: false,
                msg: error
            });
        }

    }
});


// PUT api/contacts/:id
// update contacts
// Private
router.put('/:id', authentication, async (req, res) => {

    try {
        const contact = await Contact.findById(req.params.id);
        if (!contact) {
            return res.status(400).json({
                msg: 'no Contact with this id'
            })
        } else {

            const newContact = await Contact.findByIdAndUpdate(req.params.id, req.body, {
                new: true,
                runValidators: true
            });

            return res.status(200).json({
                data: newContact
            })
        }
    } catch (error) {
        return res.status(400).json({
            msg: error
        })
    }
});



// DELETE api/contacts/:id
// delete contacts
// Private
router.delete('/:id', authentication, async (req, res) => {
    try {
        const deleteContact = await Contact.findByIdAndDelete(req.params.id);
        if (!deleteContact) {
            return res.status(400).json({
                msg: 'not found id'
            })
        } else {
            return res.status(200).json({
                msg: 'contact deleted'
            })
        }
    } catch (error) {
        return res.status(400).json({
            msg: error
        })
    }
});


// exports
module.exports = router;