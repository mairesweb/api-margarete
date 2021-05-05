const { Model, DataTypes } = require('sequelize');

class Categories extends Model {
  static init(sequelize) {
    super.init({
      name: DataTypes.STRING,
    }, {
      sequelize
    })
  }

  static associate(models) {
    this.hasMany(models.SubCategories, { foreignKey: 'category_id', as: 'sub_categories' })
  }
}

module.exports = Categories;