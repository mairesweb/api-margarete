const Categories = require('../models/Categories');

module.exports = {
  async index(req, res) {
    const categories = await Categories.findAll();

    return res.json(categories);
  },
  async get(req, res) {
    const { id } = req.params;
    const categories = await Categories.findByPk(id);

    return res.json(categories);
  },
  async store(req, res) {
    const { name } = req.body;

    const category = await Categories.create({ name });

    return res.json(category);
  }
}