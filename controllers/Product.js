const BasicController = require('./Basic');

class ProductController extends BasicController {
    constructor(modelName) {
        super(modelName);
        this.perPage = 11;
        this.paramsMap = {category: 'categoryId'};
    }
}

module.exports = new ProductController('Product');
