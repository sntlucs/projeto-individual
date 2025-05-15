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
        <input type="number" class="qtd-dados" min="1" value="1" />
      `;
      diceConfigs.appendChild(div);
    }

    function rollDados() {
      const dadoTipos = document.querySelectorAll('.dado-tipo');
      const qtdDados = document.querySelectorAll('.qtd-dados');

      let total = 0;
      let resultados = '';

      for (let i = 0; i < dadoTipos.length; i++) {
        const lados = parseInt(dadoTipos[i].value);
        const quantidade = parseInt(qtdDados[i].value);

        let resultadosInd = [];

        for (let j = 0; j < quantidade; j++) {
          const rolar = Math.floor(Math.random() * lados) + 1;
          resultadosInd.push(rolar);
          total += rolar;
        }

        resultados += `<p><strong>${quantidade}x D${lados}</strong>: [${resultados.join(', ')}] ➔ Soma: ${resultadosInd.reduce((a, b) => a + b, 0)}</p>`;
      }

      document.getElementById('result').innerHTML = `
        <h2>Resultados:</h2>
        ${resultados}
        <h3>Total Geral: ${total}</h3>
      `;
    }