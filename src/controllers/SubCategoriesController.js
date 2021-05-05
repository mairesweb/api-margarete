const Categories = require('../models/Categories');
const SubCategories = require('../models/SubCategories');
const { Op } = require('sequelize');

module.exports = {
  async index(req, res) {
    const { category_id } = req.params;

    const categories = await Categories.findByPk(category_id, {
      include: { association: 'sub_categories'}
    });

    return res.json(categories);
  },

  async indexFull(req, res) {

    const categories = await Categories.findAll({
      include: { association: 'sub_categories'}
    });

    return res.json(categories);
  },

  async getByChange(req, res) {
    const { category } = req.params;
    let subcategories;
    
    if (category != 0) {
      subcategories = await SubCategories.findAll({
        include: { association: 'category'},
        where: {
          category_id: {
            [Op.ne]: 0
          }
        }
      });
    } else {
      subcategories = await SubCategories.findAll({
        include: { association: 'category'},
        where: {
          category_id: category
        }
      });
    }

    return res.json(subcategories);
  },

  async store(req, res) {
    const { category_id } = req.params;
    const { name } = req.body;

    const category = await Categories.findByPk(category_id);

    if (!category) {
      return res.status(400).json({ error: 'Categoria não encontrada!'})
    }

    const subCategory = await SubCategories.create({ category_id, name });

    return res.json(subCategory);
  }
}