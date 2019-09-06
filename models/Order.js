module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define('Order', {
    status: {
      type: DataTypes.ENUM('W', 'P', 'F', 'C'),
      allowNull:false,
      validate: {
        isIn: [['W', 'P', 'F', 'C']],
      }
    },
    paymentMethod: {
      type: DataTypes.ENUM('E', 'C'),
      allowNull:false,
      validate: {
        isIn: [['E', 'C']],
      }
    },
    customerName: {
      type: DataTypes.STRING,
      allowNull:false,
      validate: {
        notEmpty: true
      }
    },
    customerSurname: {
      type: DataTypes.STRING,
      allowNull:false,
      validate: {
        notEmpty: true
      }
    },
    customerEmail: {
      type: DataTypes.STRING,
      allowNull:false,
      validate: {
        isEmail: true
      }
    },
    customerPhone: {
      type: DataTypes.STRING,
      allowNull:false,
      validate: {
        notEmpty: true
      }
    },
    customerAddress: {
      type: DataTypes.STRING,
      allowNull:false,
      validate: {
        notEmpty: true
      }
    },
    customerNPDepartment: {
      type: DataTypes.STRING,
      allowNull:false,
      validate: {
        notEmpty: true
      }
    },
    createdAt: {
      field: 'created_at',
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      field: 'updated_at',
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  }, {
    tableName: 'orders',
    timestamps: true,
    sequelize
  });
  Order.associate = function(models) {
    Order.hasMany(models.OrderProduct, {as: 'products', foreignKey: 'orderId'});
  };
  return Order;
};
