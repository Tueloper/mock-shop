'use strict';
module.exports = (sequelize, DataTypes) => {
  const Cart = sequelize.define('Cart', {
  }, {});
  Cart.associate = function(models) {
    // associations can be defined here

    //association with users
    Cart.belongsTo(models.Users, {
      foreignKey: 'userId',
      onDelete: 'CASADE'
    });

    //association with products
    Cart.belongsTo(models.Products, {
      foreignKey: 'productId',
      onDelete: 'CASADE'
    })
  };
  return Cart;
};