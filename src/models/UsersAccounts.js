const { Model, DataTypes } = require('sequelize');

class UsersAccounts extends Model {
  static init(sequelize) {
    super.init({
      name: DataTypes.STRING,
    }, {
      sequelize
    })
  }

  static associate(models) {
    this.belongsTo(models.Users, { foreignKey: 'user_id', as: 'user' })
    this.hasMany(models.Transactions, { foreignKey: 'account', as: 'transactions' })
  }
}

module.exports = UsersAccounts;