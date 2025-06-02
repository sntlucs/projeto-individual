async function carregarGraficosPersonagens() {
    const idUsuario = sessionStorage.ID_USUARIO;

    try {
        const response = await fetch(`/personagem/graficos/${idUsuario}`);
        const personagens = await response.json();

        const niveis = {};
        const sistemas = {};
        const classes = {};

        personagens.forEach(p => {
            niveis[p.nivel] = (niveis[p.nivel] || 0) + 1;
            sistemas[p.sistema] = (sistemas[p.sistema] || 0) + 1;
            classes[p.classe] = (classes[p.classe] || 0) + 1;
        });

        if (window.graficoNiveis && typeof window.graficoNiveis.destroy === "function") {
            window.graficoNiveis.destroy();
        }

        if (window.graficoSistemas && typeof window.graficoSistemas.destroy === "function") {
            window.graficoSistemas.destroy();
        }
        if (window.graficoClasses && typeof window.graficoClasses.destroy === "function") {
            window.graficoClasses.destroy();
        }

        window.graficoNiveis = new Chart(document.getElementById('graficoNiveis'), {
            type: 'bar',
            data: {
                labels: Object.keys(niveis).sort((a, b) => a - b),
                datasets: [{
                    label: 'Qtd. de Personagens',
                    data: Object.values(niveis),
                    backgroundColor: 'rgba(54, 162, 235, 0.6)'
                }]
            },
            options: { scales: { y: { beginAtZero: true } } }
        });

        window.graficoSistemas = new Chart(document.getElementById('graficoSistemas'), {
            type: 'doughnut',
            data: {
                labels: Object.keys(sistemas),
                datasets: [{
                    label: 'Qtd. por Sistema',
                    data: Object.values(sistemas),
                    backgroundColor: ['#ff6384', '#36a2eb', '#ffce56', '#8e44ad', '#2ecc71']
                }]
            }
        });

        window.graficoClasses = new Chart(document.getElementById('graficoClasses'), {
            type: 'bar',
            data: {
                labels: Object.keys(classes),
                datasets: [{
                    label: 'Qtd. por Classe',
                    data: Object.values(classes),
                    backgroundColor: 'rgba(255, 99, 132, 0.6)'
                }]
            },
            options: {
                indexAxis: 'y',
                scales: { x: { beginAtZero: true } }
            }
        });

    } catch (error) {
        console.error("Erro ao buscar dados dos gráficos:", error);
    }
}

document.addEventListener("DOMContentLoaded", carregarGraficosPersonagens);
