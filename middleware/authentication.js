const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config({
    path: './config/config.env'
});
const User = require('../models/User');

authentication = async (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) {
        // no token
        return res.status(400).json({
            // success: false,
            msg: "you are unauthorized"
        })
    } else {
        try {
            const decode = jwt.verify(token, process.env.SECRET);
            // console.log(decode._id);
            req.user = await User.findById(decode._id).select('-password');

            next();

        } catch (error) {
            return res.status(400).json({
                // success: false,
                msg: "Token is not valid"
            })

        }
    }
}
module.exports.authentication = authentication;