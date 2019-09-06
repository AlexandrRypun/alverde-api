module.exports = (sequelize, DataTypes) => {
  const OrderProduct = sequelize.define('OrderProduct', {
    price: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER
  }, {
    tableName: 'order_products',
    timestamps: false,
    indexes: [{ unique: true, fields: ['productId', 'orderId'] }],
    sequelize
  });
  OrderProduct.associate = function(models) {
    OrderProduct.belongsTo(models.Order, {as: 'order'});
    OrderProduct.belongsTo(models.Product, {as: 'product'});
  };
  return OrderProduct;
};
