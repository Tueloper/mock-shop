export default {
  async up (queryInterface, Sequelize) {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */

   const ProductData = [
    {
      name: 'Chevy With a White License Plate',
      description: 'A great cocktail used with various flavour',
      category: 'Cocktail',
      price: 499.99,
      imageUrl: 'https://www.thecocktaildb.com/images/media/drink/qyyvtu1468878544.jpg',
      isStock: 'True',
      cartId: '1',
      createdAt: Sequelize.literal('NOW()'),
      updatedAt: Sequelize.literal('NOW()')
    },
    {
      name: '155 Belmont',
      description: 'A great cocktail used with various flavour',
      category: 'Cocktail',
      price: 399.99,
      imageUrl: 'https://www.thecocktaildb.com/images/media/drink/yqvvqs1475667388.jpg',
      isStock: 'True',
      cartId: '1',
      createdAt: Sequelize.literal('NOW()'),
      updatedAt: Sequelize.literal('NOW()')
    },
    {
      name: 'White den',
      description: 'A great cocktail used with various flavour',
      category: 'Cocktail',
      price: 449.99,
      imageUrl: 'https://www.thecocktaildb.com/images/media/drink/8ozumt1572901761.jpg',
      isStock: 'True',
      cartId: '1',
      createdAt: Sequelize.literal('NOW()'),
      updatedAt: Sequelize.literal('NOW()')
    },
    {
      name: 'A Furlong Too Late',
      description: 'A great cocktail used with various flavour',
      category: 'Cocktail',
      price: 679.99,
      imageUrl: 'https://www.thecocktaildb.com/images/media/drink/xvwusr1472669302.jpg',
      isStock: 'True',
      cartId: '1',
      createdAt: Sequelize.literal('NOW()'),
      updatedAt: Sequelize.literal('NOW()')
    },
    {
      name: '410 Gone',
      description: 'A great cocktail used with various flavour',
      category: 'Cocktail',
      price: 179.99,
      imageUrl: 'https://www.thecocktaildb.com/images/media/drink/xtuyqv1472669026.jpg',
      isStock: 'True',
      cartId: '1',
      createdAt: Sequelize.literal('NOW()'),
      updatedAt: Sequelize.literal('NOW()')
    },
    {
      name: '50/50',
      description: 'A great cocktail used with various flavour',
      category: 'Cocktail',
      price: 449.99,
      imageUrl: 'https://www.thecocktaildb.com/images/media/drink/ywxwqs1461867097.jpg',
      isStock: 'True',
      cartId: '1',
      createdAt: Sequelize.literal('NOW()'),
      updatedAt: Sequelize.literal('NOW()')
    },
    {
      name: '501 Blue',
      description: 'A great cocktail used with various flavour',
      category: 'Cocktail',
      price: 679.99,
      imageUrl: 'https://www.thecocktaildb.com/images/media/drink/ywxwqs1461867097.jpg',
      isStock: 'True',
      cartId: '2',
      createdAt: Sequelize.literal('NOW()'),
      updatedAt: Sequelize.literal('NOW()')
    },
    {
      name: '69 Special',
      description: 'A great cocktail used with various flavour',
      category: 'Cocktail',
      price: 899.99,
      imageUrl: 'https://www.thecocktaildb.com/images/media/drink/vqyxqx1472669095.jpg',
      isStock: 'True',
      cartId: '2',
      createdAt: Sequelize.literal('NOW()'),
      updatedAt: Sequelize.literal('NOW()')
    }

  ];
  return queryInterface.bulkInsert('Products', ProductData, {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
   return queryInterface.bulkDelete("ProductData", null, {})
  }
};
