
function calcularVenda(venda) {
  const subtotal = venda.itens.reduce((acumulador, item) => {
    const descontoDoItem = item.valorItem * (item.descontoPercentual / 100) + item.descontoReal;
    const valorFinalDoItem = item.valorItem - descontoDoItem;
    return acumulador + valorFinalDoItem;
  }, 0);
  const descontoTotal = subtotal * (venda.descontoTotalPercentual / 100) + venda.descontoTotalReal;
  const totalFinal = subtotal - descontoTotal;
  return {
    totalFinal: totalFinal,
  };
}
module.exports = calcularVenda;