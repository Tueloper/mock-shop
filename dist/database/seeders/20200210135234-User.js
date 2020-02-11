"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _passwordHash = require("./../../utils/passwordHash");

var _default = {
  async up(queryInterface, Sequelize) {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.
       Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
    const UsersData = [{
      firstName: 'Tochukwu',
      lastName: 'Ozurumba',
      email: 'tozo2345@yahoo.com',
      password: (0, _passwordHash.hashPassword)('Password111'),
      isAdmin: 'True',
      createdAt: Sequelize.literal('NOW()'),
      updatedAt: Sequelize.literal('NOW()')
    }, {
      firstName: 'Ugochukwu',
      lastName: 'Mberede',
      email: 'ugochukwu.mberede@yahoo.com',
      password: (0, _passwordHash.hashPassword)('Password111'),
      isAdmin: 'False',
      createdAt: Sequelize.literal('NOW()'),
      updatedAt: Sequelize.literal('NOW()')
    }, {
      firstName: 'Ayooluwa',
      lastName: 'Olosunde',
      email: 'ayooluwa.olosunde@yahoo.com',
      password: (0, _passwordHash.hashPassword)('Password111'),
      isAdmin: 'True',
      createdAt: Sequelize.literal('NOW()'),
      updatedAt: Sequelize.literal('NOW()')
    }];
    return queryInterface.bulkInsert('Users', UsersData, {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.
       Example:
      return queryInterface.bulkDelete('People', null, {});
    */
    return queryInterface.bulkDelete("UsersData", null, {});
  }
};
exports.default = _default;