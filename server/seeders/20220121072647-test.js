'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    const datas = [];
    for (let i = 0; i < 10; i++) {
      const obj = {
        email: 'test' + i + '@example.com',
        nickname: 'testUser' + i,
        password: '1234',
        createdAt: new Date().toISOString().replace(/T/, ' ').replace(/\..+/, ''),
        updatedAt: new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')
      };
      datas.push(obj);
    }
    await queryInterface.bulkInsert('users', datas, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {});
  }
};
