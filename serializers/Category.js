const {Serializer, Deserializer} = require('jsonapi-serializer');

const serializer = new Serializer('categories', {
    attributes: ['name']
});
const deserializer = new Deserializer();

module.exports = {
    serialize: serializer.serialize.bind(serializer),
    deserialize: deserializer.deserialize.bind(deserializer)
};
