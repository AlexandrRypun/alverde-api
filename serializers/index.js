const fs = require('fs');
const path = require('path');

const basename = path.basename(__filename);
const serializers = {};

fs
  .readdirSync(__dirname)
  .forEach(file => {
   if (file !== basename) {
     serializers[file.replace('.js', '')] = require(`./${file}`);
   }
  });

module.exports = serializers;
