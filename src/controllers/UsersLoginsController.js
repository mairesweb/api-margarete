const Users = require('../models/Users');
const UsersLogins = require('../models/UsersLogins');

module.exports = {
  async index(req, res) {
    const { user_id } = req.params;

    const users = await Users.findByPk(user_id, {
      include: { association: 'users_logins'}
    });

    return res.json(users);
  },

  async store(req, res) {
    const { user_id } = req.params;
    const { token } = req.body;

    const user = await Users.findByPk(user_id);

    if (!user) {
      return res.status(400).json({ error: 'Usuário não encontrado!'})
    }

    const userLogin = await UsersLogins.create({ user_id, token });

    return res.json(userLogin);
  }
}