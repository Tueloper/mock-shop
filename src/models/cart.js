'use strict';
module.exports = (sequelize, DataTypes) => {
  const Cart = sequelize.define('Cart', {
    userId: {
      type: DataTypes.INTEGER
    }
  }, {});
  Cart.associate = function(models) {
    // associations can be defined here

    //association with users
    Cart.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'CASADE'
    });

    //association with products
    Cart.hasMany(models.CartDetail, {
      foreignKey: 'cartId',
      as: 'cartdetails'
    })
  };
  return Cart;
};