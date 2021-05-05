const axios = require('axios');
const Papers = require('../models/Papers');

module.exports = {
  async index(req, res) {
    const papers = await Papers.findAll({
      order: [
        ['code', 'ASC'],
      ]
    });

    return res.json(papers);
  },

  async indexByCode(req, res) {
    const { code } = req.params;

    const papers = await Papers.findOne({
      where: {
        code: code
      }
    });

    return res.json(papers);
  },

  async updatePaper(req, res) {
    const { code } = req.params;

    let result = await axios.get('https://marceloaires.com.br/financas.php?acoes='+ code + '&json');

    result.data.price = result.data.price.toFixed(2);
    result.data.dy = result.data.dy.toFixed(2);
    result.data.dpa = result.data.dpa.toFixed(2);
    result.data.lpa = result.data.lpa.toFixed(2);
    result.data.vpa = result.data.vpa.toFixed(2);
    result.data.margem_liquida = result.data.margem_liquida.toFixed(2);
    result.data.roe = result.data.roe.toFixed(2);
    result.data.divida_liquida_patrimonio_liquido = result.data.divida_liquida_patrimonio_liquido.toFixed(2);
    result.data.divida_liquida_ebitda = result.data.divida_liquida_ebitda.toFixed(2);
    result.data.valor_mercado = result.data.valor_mercado.toFixed(2);
    result.data.pl = result.data.pl.toFixed(2);
      
    const paper = await Papers.findOne({ where: { code: code } });

    const upPaper = await paper.update(result.data);

    return res.json(upPaper);
  },

  async store(req, res) {
    const { name, code, price, dy, dpa, lpa, vpa, margem_liquida, roe, divida_liquida_patrimonio_liquido, divida_liquida_ebitda, valor_mercado, governanca_corporativa, pl } = req.body;

    const paper = await Papers.create({ name, code, price, dy, dpa, lpa, vpa, margem_liquida, roe, divida_liquida_patrimonio_liquido, divida_liquida_ebitda, valor_mercado, governanca_corporativa, pl });

    return res.json({code});
  }
}