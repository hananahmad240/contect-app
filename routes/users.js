const express = require('express');
const User = require('../models/User');
const {
    registrationValidation
} = require('../config/validation');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config({
    path: './config/config.env'
});

// creat route
const router = express.Router();

// @route POST api/users
// register User
// public
router.post('/', async (req, res, next) => {
    const {
        error
    } = registrationValidation(req.body);
    if (error) {
        return res.status(400).json({
            // success: false,
            msg: error.details[0].message
        })
    } else {
        // check user email is already exits

        try {
            let user = await User.findOne({
                email: req.body.email
            });
            if (user) {
                // user exits
                return res.status(400).json({
                    // success: false,
                    msg: `user is already exits with this email`
                })
            } else {
                const {
                    name,
                    email,
                    password
                } = req.body;
                user = new User({
                    name,
                    email,
                    password
                });
                const salt = await bcryptjs.genSalt(10);
                user.password = await bcryptjs.hash(password, salt);
                await user.save();

                // jsonwebtoken
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