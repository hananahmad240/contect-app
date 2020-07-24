const express = require('express');
const User = require('../models/User');
const {
    LoginValidation
} = require('../config/validation');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const {
    authentication
} = require('../middleware/authentication');
dotenv.config({
    path: './config/config.env'
});


// creat route
const router = express.Router();



// GET api/auth
// get logged in users
// private
router.get('/', authentication, async (req, res) => {
    try {
        return res.status(200).json({
            success: true,
            data: req.user
        })

    } catch (error) {
        return res.status(400).json({
            // success: false,
            msg: error.message
        })
    }
});



// POST api/auth
// auth user and get token
// public
router.post('/', async (req, res, next) => {
    const {
        error
    } = LoginValidation(req.body);

    if (error) {
        return res.status(400).json({
            // success: false,
            msg: error.details[0].message
        })
    } else {
        // check user email is  exits
        const {
            email,
            password
        } = req.body;

        try {
            let user = await User.findOne({
                email: email
            });
            if (!user) {
                // user not  exits
                return res.status(400).json({
                    // success: false,
                    msg: `Invalid Credebials`
                })
            } else {
                // match password
                const isMatch = await bcryptjs.compare(password, user.password);
                if (!isMatch) {
                    return res.status(400).json({
                        // success: false,
                        msg: "Invalid Credebials"
                    });
                } else {
                    // json web token
                    const token = jwt.sign({
                        _id: user.id
                    }, process.env.SECRET, {
                        expiresIn: 3600
                    });
                    return res.status(200).json({
                        success: true,
                        data: user,
                        token
                    });
                }
            }
        } catch (error) {
            return res.status(400).json({
                // success: false,
                msg: error
            });
        }


    }
});




// exports
module.exports = router;