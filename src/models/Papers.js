const { Model, DataTypes } = require('sequelize');

class Papers extends Model {
  static init(sequelize) {
    super.init({
      name: DataTypes.STRING,
      code: DataTypes.STRING,
      price: DataTypes.DOUBLE,
      dy: DataTypes.DOUBLE,
      dpa: DataTypes.DOUBLE,
      lpa: DataTypes.DOUBLE,
      vpa: DataTypes.DOUBLE,
      margem_liquida: DataTypes.DOUBLE,
      roe: DataTypes.DOUBLE,
      divida_liquida_patrimonio_liquido: DataTypes.DOUBLE,
      divida_liquida_ebitda: DataTypes.DOUBLE,
      valor_mercado: DataTypes.DOUBLE,
      governanca_corporativa: DataTypes.STRING,
      pl: DataTypes.DOUBLE,
    }, {
      sequelize
    })
  }

  static associate(models) {
  }
}

module.exports = Papers;