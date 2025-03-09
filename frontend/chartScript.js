// script.js para chart.html
document.addEventListener('DOMContentLoaded', function() {
    fetch('https://charts.mongodb.com/charts-project-0-kingvth/public/dashboards/f38f2c29-811e-482f-b4d9-f7f4de705cd1')
      .then(response => response.json())
      .then(data => {
        const categorias = data.map(item => item.categoria);
        const valores = data.map(item => item.valor);
  
        // Gerando o gráfico
        const ctx = document.getElementById('myChart').getContext('2d');
        const myChart = new Chart(ctx, {
          type: 'bar',  // Tipo de gráfico, você pode mudar para 'line', 'pie', etc.
          data: {
            labels: categorias,  // Usando as categorias como rótulos
            datasets: [{
              label: 'Valor',
              data: valores,  // Usando os valores para o gráfico
              backgroundColor: 'rgba(255, 99, 132, 0.2)',
              borderColor: 'rgba(255, 99, 132, 1)',
              borderWidth: 1
            }]
          },
          options: {
            scales: {
              y: {
                beginAtZero: true
              }
            }
          }
        });
      })
      .catch(error => console.error('Erro ao buscar os dados:', error));
  });
  