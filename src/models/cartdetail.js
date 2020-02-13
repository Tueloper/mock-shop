'use strict';
module.exports = (sequelize, DataTypes) => {
  const CartDetail = sequelize.define('CartDetail', {
    quantity: DataTypes.FLOAT
  }, {});
  CartDetail.associate = function(models) {
    // associations can be defined here
    CartDetail.belongsTo(models.Cart, {
      foreignKey: 'cartId',
      onDelete: 'CASADE'
    })

    CartDetail.belongsTo(models.Product, {
      foreignKey: 'productId',
      onDelete: 'CASADE'
    })
  };
  return CartDetail;
};