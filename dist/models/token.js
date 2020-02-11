'use strict';

module.exports = (sequelize, DataTypes) => {
  const Token = sequelize.define('Token', {
    token: DataTypes.INTEGER
  }, {});

  Token.associate = function (models) {
    // associations can be defined here
    Token.belongsTo(models.User, {
      foreignKey: 'user_id',
      onDelete: 'CASADE'
    });
  };

  return Token;
};