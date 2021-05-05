const { Model, DataTypes } = require('sequelize');

class UsersLogins extends Model {
  static init(sequelize) {
    super.init({
      token: DataTypes.STRING,
    }, {
      sequelize
    })
  }

  static associate(models) {
    this.belongsTo(models.Users, { foreignKey: 'user_id', as: 'user' })
  }
}

module.exports = UsersLogins;