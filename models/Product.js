module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    price: {
      type: DataTypes.INTEGER,
      validate: {
        isInt: true
      }
    },
    oldPrice: DataTypes.INTEGER
  }, {
    tableName: 'products',
    timestamps: false,
    sequelize
  });
  Product.associate = function(models) {
    Product.belongsTo(models.Category, {as: 'category'});
    Product.hasMany(models.ProductTranslation, {as: 'translations', foreignKey: 'productId'});
    Product.hasMany(models.ProductImage, {as: 'images', foreignKey: 'productId'});
  };
  return Product;
};
