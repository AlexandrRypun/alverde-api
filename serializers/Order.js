const {Serializer, Deserializer} = require('jsonapi-serializer');

const serializer = new Serializer('orders', {
    attributes: ['status', 'paymentMethod', 'customerName', 'customerSurname', 'customerEmail', 'customerPhone', 'customerAddress', 'customerNPDepartment', 'products'],
    products: {
        ref: 'id',
        attributes: ['price', 'quantity', 'product', '__id__'],
        product: {
            ref: 'id',
            attributes: ['price', 'oldPrice', 'category', 'translations', 'images']
        }
    },
    pluralizeType: false,
    keyForAttribute: attribute => attribute,
    typeForAttribute: attribute => {
        let type = attribute;
        switch (attribute) {
            case 'products':
                type = 'order-product';
                break;
            default:
                break;
        }

        return type;
    },
    meta: {}
});
const deserializer = new Deserializer({
    keyForAttribute: attribute => attribute
});

module.exports = {
    serialize: function(records, count) {
        if (count !== undefined) {
            serializer.opts.meta.total = count;
        }
        return serializer.serialize.call(serializer, records);
    },
    deserialize: deserializer.deserialize.bind(deserializer)
};
