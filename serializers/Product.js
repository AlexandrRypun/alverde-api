const JSONAPISerializer = require('jsonapi-serializer').Serializer;

module.exports = new JSONAPISerializer('products', {
    attributes: ['price', 'oldPrice', 'category', 'translations', 'images'],
    category: {
        ref: 'id',
        included: false
    },
    translations: {
        ref: 'id',
        attributes: ['productId', 'lang', 'name', 'description', 'shortDescription']
    },
    images: {
        ref: 'id',
        attributes: ['src', 'main']
    },
    pluralizeType: false,
    keyForAttribute: attribute => attribute,
    typeForAttribute: attribute => {
        let type = attribute;
        switch (attribute) {
            case 'category':
                type = 'categories';
                break;
            case 'translations':
                type = 'product-translation';
                break;
            case 'images':
                type = 'product-image';
                break;
            default:
                break;
        }

        return type;
    }
});
