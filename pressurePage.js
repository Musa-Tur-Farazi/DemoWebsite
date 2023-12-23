document.addEventListener('DOMContentLoaded', function () {
    fetchDataAndUpdateChart();
    setInterval(fetchDataAndUpdateChart, 30000);
});

function fetchDataAndUpdateChart() {
    fetch('pressure_data.php')
        .then(response => response.json())
        .then(data => {
            updateChart(data);
            console.log(data);
        });
}

function updateChart(data) {
    const timestamps = data.map(entry => entry.timestamp);
    const values = data.map(entry => entry.value);
    
    if (window.sensorChart instanceof Chart) {
        window.sensorChart.destroy();
    }
    const ctx = document.getElementById('pressureChart').getContext('2d');
    window.sensorChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: timestamps,
            datasets: [{
                label: 'Pressure Data',
                data: values,
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: [{
                    type: 'linear',
                    position: 'bottom'
                }]
            }
        }
    });
}




