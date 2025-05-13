    function addDice() {
      const diceConfigs = document.getElementById('dice-configs');

      const div = document.createElement('div');
      div.classList.add('dice-entry');
      div.innerHTML = `
        <label>Dado:</label>
        <select class="dice-type">
          <option value="4">D4</option>
          <option value="6">D6</option>
          <option value="8">D8</option>
          <option value="10">D10</option>
          <option value="12">D12</option>
          <option value="20">D20</option>
          <option value="100">D100</option>
        </select>

        <label>Quantidade:</label>
        <input type="number" class="dice-quantity" min="1" value="1" />
      `;
      diceConfigs.appendChild(div);
    }

    function rollAllDice() {
      const diceTypes = document.querySelectorAll('.dice-type');
      const diceQuantities = document.querySelectorAll('.dice-quantity');

      let total = 0;
      let detailedResults = '';

      for (let i = 0; i < diceTypes.length; i++) {
        const sides = parseInt(diceTypes[i].value);
        const quantity = parseInt(diceQuantities[i].value);

        let individualResults = [];

        for (let j = 0; j < quantity; j++) {
          const roll = Math.floor(Math.random() * sides) + 1;
          individualResults.push(roll);
          total += roll;
        }

        detailedResults += `<p><strong>${quantity}x D${sides}</strong>: [${individualResults.join(', ')}] ➔ Soma: ${individualResults.reduce((a, b) => a + b, 0)}</p>`;
      }

      document.getElementById('result').innerHTML = `
        <h2>Resultados:</h2>
        ${detailedResults}
        <h3>Total Geral: ${total}</h3>
      `;
    }