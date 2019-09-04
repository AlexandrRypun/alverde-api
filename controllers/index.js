const fs = require('fs');
const controllers = {};

fs
    .readdirSync(__dirname)
    .filter(file => !['basic.js', 'index.js'].includes(file))
    .forEach(file => {
        controllers[file.replace('.js', '').toLowerCase()] = require(`./${file}`);
    });

module.exports = controllers;
