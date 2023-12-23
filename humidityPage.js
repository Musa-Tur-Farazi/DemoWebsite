document.addEventListener('DOMContentLoaded', function () {
    // Fetch data and update the chart
    fetchDataAndUpdateChart();
    // Update the chart every 30 seconds
    setInterval(fetchDataAndUpdateChart, 30000);
   // setInterval(fetchDataAndUpdateChart2, 30000);
});

function fetchDataAndUpdateChart() {
    fetch('humidity_data.php')
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
    const ctx = document.getElementById('humidityChart').getContext('2d');
    window.sensorChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: timestamps,
            datasets: [{
                label: 'Humidity Data',
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




