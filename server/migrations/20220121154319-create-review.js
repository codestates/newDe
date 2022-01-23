'use strict';
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('reviews', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      score: {
        type: Sequelize.INTEGER
      },
      content: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      user_id: {
        type: Sequelize.INTEGER
      },
      item_id: {
        type: Sequelize.INTEGER
      }
    });
  },
  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('reviews');
  }
};
