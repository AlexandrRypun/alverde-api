'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('product_translations', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      productId: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: "products",
            schema: "public"
          },
          key: "id"
        },
      },
      lang: {
        type: Sequelize.ENUM('ua-ua', 'ru-ru', 'en-us')
      },
      name: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.TEXT
      },
      shortDescription: {
        type: Sequelize.TEXT
      }
    }, {
      uniqueKeys: {
        prod_lang_unique: {
          fields: ['productId', 'lang']
        }
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('product_translations');
  }
};
