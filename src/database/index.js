const Sequelize = require('sequelize');
const dbConfig = require('../config/database');

const Users = require('../models/Users');
const UsersLogins = require('../models/UsersLogins');
const SubCategories = require('../models/SubCategories');
const Categories = require('../models/Categories');
const UsersAccounts = require('../models/UsersAccounts');
const Transactions = require('../models/Transactions');
const Papers = require('../models/Papers');

const conn = new Sequelize(dbConfig);

Users.init(conn);
UsersLogins.init(conn);
UsersAccounts.init(conn);
Categories.init(conn);
SubCategories.init(conn);
Transactions.init(conn);
Papers.init(conn);

Users.associate(conn.models);
UsersLogins.associate(conn.models);
UsersAccounts.associate(conn.models);
Categories.associate(conn.models);
SubCategories.associate(conn.models);
Transactions.associate(conn.models);

module.exports = conn;