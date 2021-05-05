'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('papers', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      name: {
        type: Sequelize.STRING(100)
      },
      code: {
        type: Sequelize.STRING(10)
      },
      price: {
        type: Sequelize.DOUBLE
      },
      dy: {
        type: Sequelize.DOUBLE
      },
      dpa: {
        type: Sequelize.DOUBLE
      },
      lpa: {
        type: Sequelize.DOUBLE
      },
      vpa: {
        type: Sequelize.DOUBLE
      },
      margem_liquida: {
        type: Sequelize.DOUBLE
      },
      roe: {
        type: Sequelize.DOUBLE
      },
      divida_liquida_patrimonio_liquido: {
        type: Sequelize.DOUBLE
      },
      divida_liquida_ebitda: {
        type: Sequelize.DOUBLE
      },
      valor_mercado: {
        type: Sequelize.DOUBLE
      },
      governanca_corporativa: {
        type: Sequelize.STRING(50)
      },
      pl: {
        type: Sequelize.DOUBLE
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false
      },
    });
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
  }
};
