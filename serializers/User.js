const {Serializer, Deserializer} = require('jsonapi-serializer');

const serializer = new Serializer('users', {
    attributes: ['firstname', 'lastname', 'email', 'password'],
    keyForAttribute: attribute => attribute,
});
const deserializer = new Deserializer({
    keyForAttribute: attribute => attribute
});

module.exports = {
    serialize: serializer.serialize.bind(serializer),
    deserialize: deserializer.deserialize.bind(deserializer)
};
