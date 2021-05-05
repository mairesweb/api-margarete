const { Model, DataTypes } = require('sequelize');

class Users extends Model {
  static init(sequelize) {
    super.init({
      name: DataTypes.STRING,
      phone: DataTypes.STRING,
      email: DataTypes.STRING,
      username: DataTypes.STRING,
      password: DataTypes.STRING,
    }, {
      sequelize
    })
  }

  static associate(models) {
    this.hasMany(models.UsersLogins, { foreignKey: 'user_id', as: 'users_logins' })
    this.hasMany(models.UsersAccounts, { foreignKey: 'user_id', as: 'users_accounts' })
  }
}

module.exports = Users;