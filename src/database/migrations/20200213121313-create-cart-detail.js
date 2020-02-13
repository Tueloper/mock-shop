'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('CartDetails', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      quantity: {
        type: Sequelize.FLOAT
      },
      cartId: {
        type: Sequelize.INTEGER,
        reference: {
          model: 'Carts',
          key: 'id',
          as: 'cartId'
        }
      },
      productId: {
        type: Sequelize.INTEGER,
        reference: {
          model: 'Products',
          key: 'id',
          as: 'productId'
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('CartDetails');
  }
};