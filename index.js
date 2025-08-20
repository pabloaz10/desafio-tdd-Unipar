const calcularVenda = require('./venda.js');

const venda = {
  itens: [
    { titulo: 'Produto A', valorItem: 100, descontoPercentual: 10, descontoReal: 0 }, // 90
    { titulo: 'Produto B', valorItem: 150, descontoPercentual: 0, descontoReal: 25 }, // 125
  ],
  descontoTotalPercentual: 10, // 10% de 215 = 21.50
  descontoTotalReal: 0,
};

JSON.stringify(calcularVenda(venda));