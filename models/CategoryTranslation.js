'use strict';
module.exports = (sequelize, DataTypes) => {
  const CategoryTranslation = sequelize.define('CategoryTranslation', {
    categoryId: DataTypes.INTEGER,
    lang: DataTypes.STRING,
    name: {
      type: DataTypes.STRING,
      allowNull:false,
      validate: {
        notEmpty: true
      }
    }
  }, {
    tableName: 'category_translations',
    timestamps: false,
    indexes: [{ unique: true, fields: ['categoryId', 'lang'] }],
    sequelize
  });
  CategoryTranslation.associate = function(models) {
    CategoryTranslation.belongsTo(models.Category, {as: 'category'});
  };
  return CategoryTranslation;
};
