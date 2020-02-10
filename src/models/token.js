'use strict';
module.exports = (sequelize, DataTypes) => {
  const Token = sequelize.define('Token', {
    user_token: DataTypes.STRING
  }, {});
  Token.associate = function(models) {
    // associations can be defined here
    Token.belongsTo(models.User, {
      onDelete: 'CASADE',
      foreignKey: 'userToken'
    })
  };
  return Token;
};