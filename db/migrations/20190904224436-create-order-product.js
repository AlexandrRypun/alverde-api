'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('order_products', {
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
      orderId: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: "orders",
            schema: "public"
          },
          key: "id"
        },
      },
      price: {
        type: Sequelize.INTEGER
      },
      quantity: {
        type: Sequelize.INTEGER
      }
    }, {
      uniqueKeys: {
        prod_order_unique: {
          fields: ['productId', 'orderId']
        }
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('order_products');
  }
};
