module.exports = (sequelize, DataTypes) => {
  const ProductImage = sequelize.define('ProductImage', {
    productId: DataTypes.INTEGER,
    src: DataTypes.STRING,
    main: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  }, {
    tableName: 'product_images',
    timestamps: false,
    sequelize
  });
  ProductImage.associate = function(models) {
    ProductImage.belongsTo(models.Product, {as: 'product'});
  };
  return ProductImage;
};
