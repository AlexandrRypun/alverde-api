module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
  }, {
    tableName: 'categories',
    timestamps: false
  });
  Category.associate = function(models) {
    Category.hasMany(models.CategoryTranslation, {as: 'translations', foreignKey: 'categoryId'});
  };
  return Category;
};
