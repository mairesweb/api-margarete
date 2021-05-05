const Users = require('../models/Users');
const UsersAccounts = require('../models/UsersAccounts');

module.exports = {
  async index(req, res) {
    const { user_id } = req.params;

    const users = await Users.findByPk(user_id, {
      include: { association: 'users_accounts'}
    });

    return res.json(users);
  },

  async store(req, res) {
    const { user_id } = req.params;
    const { name } = req.body;

    const user = await Users.findByPk(user_id);

    if (!user) {
      return res.status(400).json({ error: 'Usuário não encontrado!'})
    }

    const userAccount = await UsersAccounts.create({ user_id, name });

    return res.json(userAccount);
  }
}