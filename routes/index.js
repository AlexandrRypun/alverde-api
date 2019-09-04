const express = require('express');
const router = express.Router();
const controllers = require('../controllers');
const isAuthenticated = require('../middlewares/isAuthenticated');
const isAdmin = require('../middlewares/isAdmin');

// router.get('/categories', controllers.category.list.bind(controllers.category));

router.route('/categories')
    .get(controllers.category.list.bind(controllers.category))
    .post(isAuthenticated, isAdmin, controllers.category.create.bind(controllers.category));

router.route('/products')
    .get(controllers.product.list.bind(controllers.product))
    .post(isAuthenticated, isAdmin, controllers.product.create.bind(controllers.product));

router.route('/products/:id')
    .get(controllers.product.item.bind(controllers.product));

router.route('/products/validate')
    .post(controllers.product.validate.bind(controllers.product));


router.route('/users')
    .get(controllers.user.list.bind(controllers.user))
    .post(controllers.user.create.bind(controllers.user));

module.exports = router;
