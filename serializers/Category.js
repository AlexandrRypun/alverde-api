const {Serializer, Deserializer} = require('jsonapi-serializer');

const serializer = new Serializer('categories', {
    attributes: ['translations'],
    translations: {
        ref: 'id',
        attributes: ['categoryId', 'lang', 'name']
    },
    typeForAttribute: attribute => {
        return attribute === 'translations' ? 'category-translation' : attribute;
    }
});
const deserializer = new Deserializer({
    keyForAttribute: attribute => attribute
});

module.exports = {
    serialize: serializer.serialize.bind(serializer),
    deserialize: deserializer.deserialize.bind(deserializer)
};
