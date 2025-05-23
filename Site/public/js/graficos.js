// 1. Benefícios mais relatados

Chart.defaults.color = '#ffffff';
Chart.defaults.borderColor = '#CCC9CD';

// chart.canvas.parentNode.style.height = '128px';
// chart.canvas.parentNode.style.width = '128px';

new Chart(document.getElementById('graficoBeneficios'), {
  type: 'bar',
  data: {
    labels: ['Criatividade', 'Habilidades sociais', 'Redução da ansiedade', 'Resolução de problemas', 'Inteligência emocional'],
    datasets: [{
      label: '% de jogadores',
      data: [82, 76, 64, 71, 59],
      backgroundColor: 'rgba(75, 192, 192, 0.6)'
    }]
  },
  options: { responsive: true, plugins: { legend: { display: false } } }
});

// 2. Habilidades cognitivas (radar)
new Chart(document.getElementById('graficoCognitivas'), {
  type: 'radar',
  data: {
    labels: ['Atenção', 'Memória', 'Raciocínio lógico', 'Linguagem', 'Imaginação'],
    datasets: [{
      label: 'Desenvolvimento Cognitivo',
      data: [8, 7, 9, 8, 10],
      backgroundColor: 'rgba(153, 102, 255, 0.2)',
      borderColor: 'rgb(122, 87, 193)',
      pointBackgroundColor: 'rgb(206, 181, 255)'
    }]
  },
  options: { responsive: true }
});

// 3. Gêneros de RPG
new Chart(document.getElementById('graficoGeneros'), {
  type: 'pie',
  data: {
    labels: ['Fantasia medieval', 'Cyberpunk', 'Terror psicológico', 'Sci-Fi', 'Super-heróis'],
    datasets: [{
      data: [30, 20, 15, 20, 15],
      backgroundColor: ['#ff6384', '#36a2eb', '#cc65fe', '#ffce56', '#4bc0c0']
    }]
  },
  options: { responsive: true }
});

// 4. Popularidade ao longo do tempo
new Chart(document.getElementById('graficoPopularidade'), {
  type: 'line',
  data: {
    labels: ['2015', '2017', '2019', '2021', '2023'],
    datasets: [{
      label: 'Interesse (%)',
      data: [35, 50, 65, 78, 90],
      borderColor: 'rgba(255, 99, 132, 1)',
      backgroundColor: 'rgba(255, 99, 132, 0.2)',
      fill: true
    }]
  },
  options: { responsive: true }
});

// 5. Comparativo jogadores vs não jogadores
new Chart(document.getElementById('graficoComparativo'), {
  type: 'bar',
  data: {
    labels: ['Jogadores', 'Não jogadores'],
    datasets: [{
      label: 'Habilidades sociais (0-10)',
      data: [8.4, 6.2],
      backgroundColor: ['#36a2eb', '#ff6384']
    }]
  },
  options: { responsive: true }
});

// 6. Aplicações do RPG
new Chart(document.getElementById('graficoAplicacoes'), {
  type: 'bar',
  data: {
    labels: ['Educação básica', 'Terapia', 'Ensino superior', 'Treinamento corporativo', 'Lazer'],
    datasets: [{
      label: 'Presença em contextos (%)',
      data: [70, 60, 65, 40, 85],
      backgroundColor: 'rgba(255, 206, 86, 0.6)'
    }]
  },
  options: {
    responsive: true,
    indexAxis: 'y'
  }
});

// 7. Dispersão: frequência vs bem-estar
new Chart(document.getElementById('graficoDispersao'), {
  type: 'scatter',
  data: {
    datasets: [{
      label: 'Sessões por mês x Bem-estar',
      data: [
        { x: 1, y: 5 },
        { x: 2, y: 6 },
        { x: 4, y: 7.5 },
        { x: 6, y: 8.2 },
        { x: 8, y: 9 },
        { x: 10, y: 9.3 }
      ],
      backgroundColor: 'rgba(54, 162, 235, 0.8)'
    }]
  },
  options: {
    responsive: true,
    scales: {
      x: {
        title: {
          display: true,
          text: 'Sessões de RPG por mês'
        }
      },
      y: {
        title: {
          display: true,
          text: 'Nota de bem-estar (0 a 10)'
        }
      }
    }
  }
});