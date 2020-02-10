'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isAdmin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    }
  }, {});
  User.associate = function(models) {
    // associations can be defined here
    User.hasMany(models.Cart, {
      foreignKey: 'userId',
      as: 'cart'
    })

    //token association with user
    User.hasMany(models.Token, {
      foreignKey: 'userToken',
      as: 'token'
    })
  };
  return User;
};