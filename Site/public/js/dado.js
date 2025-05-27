function addDado() {
  const dadoConfigs = document.getElementById('dado-config');

  const div = document.createElement('div');
  div.classList.add('escolher-dado');
  div.innerHTML = `
  <label>Dado:</label>
  <select class="dado-tipo">
    <option value="4">D4</option>
    <option value="6">D6</option>
    <option value="8">D8</option>
    <option value="10">D10</option>
    <option value="12">D12</option>
    <option value="20">D20</option>
    <option value="100">D100</option>
  </select>

  <label>Quantidade:</label>
  <input type="number" class="qtd-dados" min="1" value="1">

  <label class="label-modificador">Mod:</label>
  <input type="number" class="modificador" value="0">

  <label>Tipo:</label>
  <select class="tipo-rolagem">
    <option value="normal">Normal</option>
    <option value="vantagem">Vantagem</option>
    <option value="desvantagem">Desvantagem</option>
  </select>
`;

  dadoConfigs.appendChild(div);
}

function rollDados() {
    const dadoTipos = document.querySelectorAll('.dado-tipo');
    const qtdDados = document.querySelectorAll('.qtd-dados');
    const modificadores = document.querySelectorAll('.modificador');
    const tiposRolagem = document.querySelectorAll('.tipo-rolagem');

    let total = 0;
    let resultados = '';

    for (let i = 0; i < dadoTipos.length; i++) {
        const lados = parseInt(dadoTipos[i].value);
        const quantidade = parseInt(qtdDados[i].value);
        const modificador = parseInt(modificadores[i].value);
        const tipo = tiposRolagem[i].value;

        let resultadosInd = [];
        let detalhesRolagem = [];

        for (let j = 0; j < quantidade; j++) {
            const rolagem = rolarDado(lados, tipo);
            const resultadoFinal = rolagem.resultado + modificador;

            resultadosInd.push(resultadoFinal);
            total += resultadoFinal;

            detalhesRolagem.push(`[${rolagem.valores.join(', ')}]`);
        }

        resultados += `
            <p><strong>${quantidade}x D${lados}</strong> (${tipo}, Mod ${modificador}): 
            <br> (Valores rolados: ${detalhesRolagem.join(', ')}) 
            ➔ Resultado: [${resultadosInd.join(', ')}] 
            ➔ Soma: ${resultadosInd.reduce((a, b) => a + b, 0)}
            </p>`;
    }

    document.getElementById('result').innerHTML = `
        <h2>Resultados:</h2>
        ${resultados}
        <h3>Total Geral: ${total}</h3>
    `;
}

function rolarDado(lados, tipo) {
    const rolagem1 = Math.floor(Math.random() * lados) + 1;
    const rolagem2 = Math.floor(Math.random() * lados) + 1;

    if (tipo === 'vantagem') {
        const resultado = Math.max(rolagem1, rolagem2);
        return { valores: [rolagem1, rolagem2], resultado };
    } else if (tipo === 'desvantagem') {
        const resultado = Math.min(rolagem1, rolagem2);
        return { valores: [rolagem1, rolagem2], resultado };
    } else {
        return { valores: [rolagem1], resultado: rolagem1 };
    }
}
