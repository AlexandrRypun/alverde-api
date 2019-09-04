const JSONAPISerializer = require('jsonapi-serializer').Serializer;

module.exports = new JSONAPISerializer('categories', {
    attributes: ['name']
});
