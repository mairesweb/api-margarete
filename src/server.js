const express = require("express");
const app = express();
const routes = require('./routes');

require('./database');

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(express.json());
app.use(routes);

app.post("/", function(req, res){
  res.send('tudo certo');
});

app.listen("8000");