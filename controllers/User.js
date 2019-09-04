const BasicController = require('./Basic');

class UserController extends BasicController {
    async create(req, res) {
        delete req.body.role;
        super.create(req, res);
    }
}

module.exports = new UserController('User');
