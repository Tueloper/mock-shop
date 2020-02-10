'use strict';
module.exports = (sequelize, DataTypes) => {
  const Token = sequelize.define('Token', {
    user_id: DataTypes.INTEGER
  }, {});
  Token.associate = function(models) {
    // associations can be defined here
    Token.belongsTo(models.Tokens, {
      foreignKey: 'user_id',
      onDelete: 'CASADE'
    })
  };
  return Token;
};