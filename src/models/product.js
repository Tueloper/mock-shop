'use strict';
module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    imageUrl: {
      type: DataTypes.STRING
    },
    image_publicId: {
      type: DataTypes.STRING
    },
    isStock:{
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  }, {});
  Product.associate = function(models) {
    // associations can be defined here
    Product.belongsTo(models.Cart, {
      foreignKey: 'cartId',
      onDelete: 'CASADE'
    })
  };
  return Product;
};