const jwt = require('jsonwebtoken');
// const {user: User} = require('../models');

module.exports = async (req, res, next) => {
    // try {
    //     if (req.headers.authorization !== undefined) {
    //         const token = req.headers.authorization.replace('jwt ', '');
    //
    //         const payload = jwt.verify(token, 'bemiracle', {algorithm: "HS256"}); //secret
    //         if (payload && payload.userId) {
    //             const user = await User.findByPk(payload.userId);
    //             if (user) {
    //                 req.user = payload;
    //                 return next();
    //             }
    //         }
    //     }
    // } catch (err) {}
    //
    // res.status(403);
    // throw new Error("Not Authorized");
    next();
};
