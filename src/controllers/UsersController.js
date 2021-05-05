const Users = require('../models/Users');
const UsersLogins = require('../models/UsersLogins');

module.exports = {
  async index(req, res) {
    const users = await Users.findAll();

    return res.json(users);
  },

  async login(req, res) {
    const { username, password } = req.body;
    const encodePass = Buffer.from(password).toString('base64');
    const user = await Users.findOne({ where: { username, password: encodePass }});

    if (!user) {
      return res.status(400).json({ error: 'Usuário não encontrado!'})
    }
    
    const token = Buffer.from(new Date() + 'natharcuri').toString('base64');
    const user_id = user.id;
    await UsersLogins.create({ user_id, token });

    const newUser = { user, token };
    
    return res.json(newUser);
  },

  async indexByToken(req, res) {
    const { token } = req.params;

    const users = await UsersLogins.findOne({
      include: { association: 'user'},
      where: {
        token: token
      }
    });

    return res.json(users);
  },

  async store(req, res) {
    const { name, phone, email, username, password } = req.body;
    
    const newPass = Buffer.from(password).toString('base64');
    const token = Buffer.from(new Date() + 'natharcuri').toString('base64');

    const user = await Users.create({ name, phone, email, username, password: newPass });
    const user_id = user.id;
    await UsersLogins.create({ user_id, token });

    return res.json({token});
  }
}