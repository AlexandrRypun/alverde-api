const bcrypt = require('bcrypt');

const hashPasswordHook = async instance => {
  if (instance.changed('password')) {
    const hash = await bcrypt.hash(instance.get('password'), 10);
    instance.set('password', hash);
  }
  return instance;
};

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      unique: true
    },
    password: DataTypes.STRING,
    role: {
      type: DataTypes.ENUM('admin', 'user'),
      defaultValue: 'user'
    }
  }, {
    tableName: 'users',
    sequelize
  });

  User.beforeCreate(hashPasswordHook);
  User.beforeUpdate(hashPasswordHook);
  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};
