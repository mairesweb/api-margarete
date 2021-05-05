const express = require("express");
const UsersController = require('./controllers/UsersController');
const UsersLoginsController = require('./controllers/UsersLoginsController');
const UsersAccountsController = require('./controllers/UsersAccountsController');
const CategoriesController = require("./controllers/CategoriesController");
const SubCategoriesController = require("./controllers/SubCategoriesController");
const TransactionsController = require("./controllers/TransactionsController");
const PapersController = require("./controllers/PapersController");

const routes = express.Router();

routes.get('/users', UsersController.index);

routes.post('/signup', UsersController.store);
routes.post('/login', UsersController.login);
routes.get('/users/:token/user_token', UsersController.indexByToken);

routes.get('/users/:user_id/users_logins', UsersLoginsController.index);
routes.post('/users/:user_id/users_logins', UsersLoginsController.store);

routes.get('/users/:user_id/users_accounts', UsersAccountsController.index);
routes.post('/users/:user_id/users_accounts', UsersAccountsController.store);

routes.get('/categories', CategoriesController.index);
routes.post('/categories', CategoriesController.store);

routes.get('/categories/sub_categories', SubCategoriesController.indexFull);
routes.get('/categories/:category_id/sub_categories', SubCategoriesController.index);
routes.get('/categories/:category/indexChange', SubCategoriesController.getByChange);
routes.post('/categories/:category_id/sub_categories', SubCategoriesController.store);

routes.get('/users_accounts/:account/transactions', TransactionsController.indexAccount);
routes.get('/sub_categories/:subcategory/transactions', TransactionsController.indexSubCategory);
routes.post('/sub_categories/:category/users_accounts/:account/transactions', TransactionsController.store);
routes.post('/transactions/getByMonth', TransactionsController.getByMonth);
routes.post('/transactions/getMonths', TransactionsController.getMonths);
routes.post('/transactions/getTotals', TransactionsController.getTotals);
routes.post('/transactions/delete/:id', TransactionsController.delete);

routes.get('/papers', PapersController.index);
routes.get('/papers/:code', PapersController.indexByCode);
routes.get('/papers/:code/updatePaper', PapersController.updatePaper);

routes.get('/', (req, res) => {
  return res.json({ hello: 'World' });
})

module.exports = routes;