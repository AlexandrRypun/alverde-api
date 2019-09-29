const jwt = require('jsonwebtoken');
const { user: User } = require('../models');
const { promisify } = require('util');
const jwtVerify = promisify(jwt.verify);
const secret = require('../config/config.json').jwtSecret;

module.exports = async (req, res, next) => {
    try {
        if (req.headers.authorization !== undefined) {
            const token = req.headers.authorization.replace('Bearer ', '');

            const payload = await jwtVerify(token, secret);
            if (payload && payload.id) {
                req.user = payload;
                return next();
            }
        }
    } catch (err) {}

    res.status(401);
    next(new Error("Not Authorized"));
};
