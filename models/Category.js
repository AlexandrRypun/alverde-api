module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
    name: DataTypes.STRING
  }, {
    tableName: 'categories',
    timestamps: false
  });
  Category.associate = function(models) {
    // associations can be defined here
  };
  return Category;
};

// const { Model } = require('sequelize');
//
// class Category extends Model {
//   static init(sequelize, DataTypes) {
//     return super.init({
//       name: DataTypes.STRING
//     }, {
//       timestamps: false
//     })
//   }
// }
// module.exports = Category;
