const { Model, DataTypes } = require('sequelize');

class Transactions extends Model {
  static init(sequelize) {
    super.init({
      name: DataTypes.STRING,
      value: DataTypes.DOUBLE,
      date: DataTypes.DATEONLY,
      type: DataTypes.BOOLEAN,
    }, {
      sequelize
    })
  }

  static associate(models) {
    this.belongsTo(models.SubCategories, { foreignKey: 'category', as: 'sub_categories' })
    this.belongsTo(models.SubCategories, { foreignKey: 'account', as: 'users_accounts' })
  }
}

module.exports = Transactions;