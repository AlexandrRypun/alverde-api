'use strict';
module.exports = (sequelize, DataTypes) => {
  const ProductTranslation = sequelize.define('ProductTranslation', {
    lang: DataTypes.STRING,
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    shortDescription: DataTypes.TEXT
  }, {
    tableName: 'product_translations',
    timestamps: false,
    indexes: [{ unique: true, fields: ['productId', 'lang'] }],
    sequelize
  });
  ProductTranslation.associate = function(models) {
    ProductTranslation.belongsTo(models.Product, {as: 'product'});
  };
  return ProductTranslation;
};
