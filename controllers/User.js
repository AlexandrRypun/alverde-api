const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const jwtSign = promisify(jwt.sign);
const secret = require('../config/config.json').jwtSecret;

const BasicController = require('./Basic');

class UserController extends BasicController {
    async create(req, res) {
        delete req.body.role;
        super.create(req, res);
    }

    async login(req, res) {
        try {
            const { email, password } = req.body;

            if (email && password) {
                let user = await this.model.findOne({ where: { email }});
                if (user && await bcrypt.compare(password, user.password)) {
                    delete user.password;
                    const token = await jwtSign(JSON.stringify(user), secret);

                    return res.status(200).json({ token });
                }
            }

            res.status(403).json({error: 'Access denied'});
        } catch (error) {
            res.status(400).json(error);
        }
    }
}

module.exports = new UserController('User');
