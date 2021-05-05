const Transactions = require('../models/Transactions');
const SubCategories = require('../models/SubCategories');
const UsersAccounts = require('../models/UsersAccounts');
const UsersLogins = require('../models/UsersLogins');
const Sequelize = require('sequelize');

module.exports = {
  async indexAccount(req, res) {
    const { account } = req.params;

    const transactions = await UsersAccounts.findByPk(account, {
      include: { association: 'transactions'}
    });

    return res.json(transactions);
  },
  async indexSubCategory(req, res) {
    const { subcategory } = req.params;
    
    const transactions = await SubCategories.findByPk(subcategory, {
      include: { association: 'transactions'}
    });

    return res.json(transactions);
  },

  async getByMonth(req, res) {
    const { token, month } = req.body;

    const user = await UsersLogins.findOne({
      attributes: ['user_id'],
      where: {
        token: token
      }
    });

    const account = await UsersAccounts.findOne({
      attributes: ['id'],
      where: {
        user_id: user.user_id
      }
    });

    const transactions = await Transactions.findAll({
      where: {
        [Sequelize.Op.and]: [
          { account: account.id },
          Sequelize.where(Sequelize.fn('month', Sequelize.col("date")), month.substr(5, 2)),
          Sequelize.where(Sequelize.fn('YEAR', Sequelize.col("date")), month.substr(0, 4))
        ]
      },
      include: { association: 'sub_categories'},
    });

    return res.json(transactions);
  },

  async getMonths(req, res) {
    const { token } = req.body;

    const user = await UsersLogins.findOne({
      attributes: ['user_id'],
      where: {
        token: token
      }
    });

    const account = await UsersAccounts.findOne({
      attributes: ['id'],
      where: {
        user_id: user.user_id
      }
    });

    let transactions = await Transactions.findAll({
      attributes: ['date'],
      order: [
        ['date', 'DESC']
      ]
    });

    months = [
      'Janeiro',
      'Fevereiro',
      'Março',
      'Abril',
      'Maio',
      'Junho',
      'Julho',
      'Agosto',
      'Setembro',
      'Outubro',
      'Novembro',
      'Dezembro',
    ]

    transact = [];
    for (let data of transactions) {
      key = data.date.substr(0, 4) + '-' + data.date.substr(5, 2);
      transact.push({ ref: key, month: months[data.date.substr(5, 2)-1] + '/' + data.date.substr(0, 4) });
    }

    const filteredArr = transact.reduce((acc, current) => {
      const x = acc.find(item => item.ref === current.ref);
      if (!x) {
        return acc.concat([current]);
      } else {
        return acc;
      }
    }, []);

    return res.json(filteredArr);
  },

  async getTotals(req, res) {
    const { token } = req.body;

    const user = await UsersLogins.findOne({
      attributes: ['user_id'],
      where: {
        token: token
      }
    });

    const account = await UsersAccounts.findOne({
      attributes: ['id'],
      where: {
        user_id: user.user_id
      }
    });

    const despesas = await Transactions.sum('value', {
      where: {
        account: account.id,
        type: 1
      }
    });

    const receitas = await Transactions.sum('value', {
      where: {
        account: account.id,
        type: 0
      }
    });

    const total = receitas + despesas;

    return res.json({ receitas, despesas, total });
  },

  async store(req, res) {
    const { category, account } = req.params;
    const { id, name, value, date, type } = req.body;

    const categories = await SubCategories.findByPk(category);

    if (!categories) {
      return res.status(400).json({ error: 'Categoria não encontrada!'})
    }

    const accounts = await UsersAccounts.findByPk(account);

    if (!accounts) {
      return res.status(400).json({ error: 'Conta não encontrada!'})
    }

    let vTemp = value.replace(',', '.');
    if (type == 1 && value > 0) {
      vTemp = -value;
    }

    let transactions;
    if (id) {
      transactions = await Transactions.update(
        { category, account, value: vTemp, date, name, type },
        { where: { id: id }}
      );
    } else {
      transactions = await Transactions.create({ category, account, value: vTemp, date, name, type });
    }

    return res.json(transactions);
  },

  async delete(req, res) {
    const { id } = req.params;
    const { token } = req.body;

    const user = await UsersLogins.findOne({
      attributes: ['user_id'],
      where: {
        token: token
      }
    });

    const account = await UsersAccounts.findOne({
      attributes: ['id'],
      where: {
        user_id: user.user_id
      }
    });

    const transactions = await Transactions.destroy({
      where: {
        account: account.id,
        id: id
      }
    });

    return res.json(transactions);
  },
}