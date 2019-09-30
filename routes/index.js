const express = require('express');
const router = express.Router();
const controllers = require('../controllers');
const isAuthenticated = require('../middlewares/isAuthenticated');
const isAdmin = require('../middlewares/isAdmin');

router.route('/categories')
    .get(controllers.category.list.bind(controllers.category))
    .post(isAuthenticated, isAdmin, controllers.category.create.bind(controllers.category))
    .patch(isAuthenticated, isAdmin, controllers.category.create.bind(controllers.category));
router.route('/categories/:id')
    .get(controllers.category.item.bind(controllers.category));
router.route('/categories/validate')
    .post(controllers.category.validate.bind(controllers.category));


router.route('/products')
    .get(controllers.product.list.bind(controllers.product))
    .post(isAuthenticated, isAdmin, controllers.product.create.bind(controllers.product));

router.route('/products/:id')
    .get(controllers.product.item.bind(controllers.product));

router.route('/products/validate')
    .post(controllers.product.validate.bind(controllers.product));

router.route('/orders')
    .get(isAuthenticated, controllers.order.list.bind(controllers.order))
    .post(controllers.order.create.bind(controllers.order));

router.route('/orders/validate')
    .post(controllers.order.validate.bind(controllers.order));

router.route('/users')
    .get(isAuthenticated, isAdmin, controllers.user.list.bind(controllers.user))
    .post(controllers.user.create.bind(controllers.user));
router.route('/users/validate')
    .post(controllers.user.validate.bind(controllers.user));
router.route('/login')
    .post(controllers.user.login.bind(controllers.user));

module.exports = router;
