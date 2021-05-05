const { Model, DataTypes } = require('sequelize');

class SubCategories extends Model {
  static init(sequelize) {
    super.init({
      name: DataTypes.STRING,
    }, {
      sequelize
    })
  }

  static associate(models) {
    this.belongsTo(models.Categories, { foreignKey: 'category_id', as: 'category' })
    this.hasMany(models.Transactions, { foreignKey: 'category', as: 'transactions' })
  }
}

module.exports = SubCategories;