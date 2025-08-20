// Importa a função que será criada pelos alunos
const calcularVenda = require('./venda.js');

describe('calcularVenda', () => {

  // Teste 1: Deve calcular o total final corretamente com descontos percentuais nos itens.
  test('deve calcular o total com descontos percentuais nos itens', () => {
    const venda = {
      itens: [
        { titulo: 'Produto A', valorItem: 100, descontoPercentual: 10, descontoReal: 0 }, // 100 - 10% = 90
        { titulo: 'Produto B', valorItem: 200, descontoPercentual: 5, descontoReal: 0 },  // 200 - 5% = 190
      ],
      descontoTotalPercentual: 0,
      descontoTotalReal: 0,
    };
    // Subtotal = 90 + 190 = 280
    expect(calcularVenda(venda).totalFinal).toBeCloseTo(280.00);
  });

  // Teste 2: Deve calcular o total final corretamente com descontos em valor real nos itens.
  test('deve calcular o total com descontos em valor real nos itens', () => {
    const venda = {
      itens: [
        { titulo: 'Produto A', valorItem: 50, descontoPercentual: 0, descontoReal: 10 }, // 50 - 10 = 40
        { titulo: 'Produto B', valorItem: 150, descontoPercentual: 0, descontoReal: 25 }, // 150 - 25 = 125
      ],
      descontoTotalPercentual: 0,
      descontoTotalReal: 0,
    };
    // Subtotal = 40 + 125 = 165
    expect(calcularVenda(venda).totalFinal).toBeCloseTo(165.00);
  });

  // Teste 3: Deve escolher o maior desconto do item (percentual vs. real).
  test('deve aplicar o maior desconto no item quando ambos são fornecidos', () => {
    const venda = {
      itens: [
        // 10% de 100 = 10. Desconto real = 5. Aplica 10. Valor final: 90.
        { titulo: 'Produto A', valorItem: 100, descontoPercentual: 10, descontoReal: 5 },
        // 5% de 200 = 10. Desconto real = 15. Aplica 15. Valor final: 185.
        { titulo: 'Produto B', valorItem: 200, descontoPercentual: 5, descontoReal: 15 },
      ],
      descontoTotalPercentual: 0,
      descontoTotalReal: 0,
    };
    // Subtotal = 90 + 185 = 275
    expect(calcularVenda(venda).totalFinal).toBeCloseTo(275.00);
  });

  // Teste 4: Deve aplicar um desconto percentual sobre o total da venda.
  test('deve aplicar o desconto percentual no total da venda', () => {
    const venda = {
      itens: [
        { titulo: 'Produto A', valorItem: 100, descontoPercentual: 10, descontoReal: 0 }, // 90
        { titulo: 'Produto B', valorItem: 200, descontoPercentual: 0, descontoReal: 10 }, // 190
      ],
      descontoTotalPercentual: 10, // 10% sobre o subtotal de 280
      descontoTotalReal: 0,
    };
    // Subtotal = 90 + 190 = 280
    // Desconto total = 10% de 280 = 28
    // Total final = 280 - 28 = 252
    expect(calcularVenda(venda).totalFinal).toBeCloseTo(252.00);
  });

  // Teste 5: Deve aplicar um desconto em valor real sobre o total da venda.
  test('deve aplicar o desconto em valor real no total da venda', () => {
    const venda = {
      itens: [
        { titulo: 'Produto A', valorItem: 100, descontoPercentual: 0, descontoReal: 0 }, // 100
        { titulo: 'Produto B', valorItem: 200, descontoPercentual: 0, descontoReal: 0 }, // 200
      ],
      descontoTotalPercentual: 0,
      descontoTotalReal: 50,
    };
    // Subtotal = 100 + 200 = 300
    // Total final = 300 - 50 = 250
    expect(calcularVenda(venda).totalFinal).toBeCloseTo(250.00);
  });

  // Teste 6: Deve escolher o maior desconto no total da venda (percentual vs. real).
  test('deve aplicar o maior desconto no total quando ambos são fornecidos', () => {
    const venda = {
      itens: [
        { titulo: 'Produto A', valorItem: 150, descontoPercentual: 0, descontoReal: 0 }, // 150
        { titulo: 'Produto B', valorItem: 250, descontoPercentual: 0, descontoReal: 0 }, // 250
      ],
      // Subtotal = 400
      // Desconto percentual: 10% de 400 = 40
      // Desconto real: 50
      // Aplica R$ 50.
      descontoTotalPercentual: 10,
      descontoTotalReal: 50,
    };
    // Total final = 400 - 50 = 350
    expect(calcularVenda(venda).totalFinal).toBeCloseTo(350.00);
  });

  // Teste 7: Deve retornar o objeto completo, preenchendo o desconto real se apenas o percentual for passado.
  test('deve retornar o objeto de resultado com a estrutura correta', () => {
    const venda = {
      itens: [
        { titulo: 'Produto A', valorItem: 100, descontoPercentual: 10, descontoReal: 0 }, // 90
        { titulo: 'Produto B', valorItem: 150, descontoPercentual: 0, descontoReal: 25 }, // 125
      ],
      descontoTotalPercentual: 10, // 10% de 215 = 21.50
      descontoTotalReal: 0,
    };
    const resultadoEsperado = {
      subtotal: 215.00,
      descontoTotalPercentual: 10,
      descontoTotalReal: 21.50, // Campo preenchido
      totalFinal: 193.50,
    };
    expect(calcularVenda(venda)).toEqual(resultadoEsperado);
  });

  // Teste 8: Deve preencher o desconto percentual total se apenas o real for fornecido.
  test('deve preencher o descontoTotalPercentual se apenas o descontoTotalReal for fornecido', () => {
    const venda = {
      itens: [
        { titulo: 'Produto A', valorItem: 200, descontoPercentual: 0, descontoReal: 0 }, // 200
        { titulo: 'Produto B', valorItem: 300, descontoPercentual: 0, descontoReal: 0 }, // 300
      ],
      descontoTotalPercentual: 0,
      descontoTotalReal: 50, // 50 é 10% do subtotal de 500
    };
    const resultado = calcularVenda(venda);
    expect(resultado.subtotal).toBeCloseTo(500.00);
    expect(resultado.descontoTotalReal).toBeCloseTo(50.00);
    expect(resultado.descontoTotalPercentual).toBeCloseTo(10.00);
    expect(resultado.totalFinal).toBeCloseTo(450.00);
  });

  // Teste 9: Deve lidar com uma lista de itens vazia.
  test('deve retornar zero para todos os campos se a lista de itens estiver vazia', () => {
    const venda = {
      itens: [],
      descontoTotalPercentual: 10,
      descontoTotalReal: 50,
    };
    const resultadoEsperado = {
      subtotal: 0,
      descontoTotalPercentual: 10,
      descontoTotalReal: 0, // Como o subtotal é 0, o desconto real é 0
      totalFinal: 0,
    };
    expect(calcularVenda(venda)).toEqual(resultadoEsperado);
  });

  // Teste 10: O desconto no item não pode ser maior que o valor do próprio item.
  test('o desconto do item não deve exceder o valor do item', () => {
    const venda = {
      itens: [
        { titulo: 'Produto A', valorItem: 50, descontoPercentual: 0, descontoReal: 60 }, // Desconto deve ser 50
        { titulo: 'Produto B', valorItem: 40, descontoPercentual: 110, descontoReal: 0 }, // Desconto deve ser 40
      ],
      descontoTotalPercentual: 0,
      descontoTotalReal: 0,
    };
    // O valor dos itens após desconto deve ser 0, não negativo.
    // Subtotal = 0 + 0 = 0
    expect(calcularVenda(venda).totalFinal).toBeCloseTo(0);
  });

  // Teste 11: O desconto total não pode ser maior que o subtotal.
  test('o desconto total não deve exceder o valor do subtotal', () => {
    const venda = {
      itens: [
        { titulo: 'Produto A', valorItem: 50, descontoPercentual: 0, descontoReal: 10 }, // 40
        { titulo: 'Produto B', valorItem: 40, descontoPercentual: 0, descontoReal: 0 }, // 40
      ],
      descontoTotalPercentual: 0,
      descontoTotalReal: 100, // Subtotal é 80, desconto real é 100. Deve aplicar 80.
    };
    // Total Final não pode ser negativo.
    expect(calcularVenda(venda).totalFinal).toBeCloseTo(0);
  });
});