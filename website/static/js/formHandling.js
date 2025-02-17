    window.addEventListener('load', function() {
        // Define the updateChart function
        function updateChart(data) {
            var canvas = document.getElementById('barChart');
            if (!canvas) {
                console.error('The canvas element was not found!');
                return;
            }
        
            var ctx = canvas.getContext('2d');
            if (window.barChart) {
                window.barChart.destroy(); // Destroy the old chart instance if it exists
            }
        
            // Prepare the labels and dataset from the fetched data
            const labels = data.map(item => item[0]); // For example, model names
            const datasetData = data.map(item => item[1]); // For example, scores
        
            const config = {
                type: 'bar',
                data: {
                    labels: labels,
                    datasets: [{
                        label: 'Average Score',
                        data: datasetData,
                        backgroundColor: 'rgba(75, 192, 192, 0.2)',
                        borderColor: 'rgba(75, 192, 192, 1)',
                        borderWidth: 1
                    }]
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    },
                    responsive: true,
                    maintainAspectRatio: false
                }
            };
        
            // Create the chart with the configuration
            window.barChart = new Chart(ctx, config);
        }
    
        var form = document.getElementById('selection-form');
        form.addEventListener('submit', function(event) {
            event.preventDefault();
    
            var race = document.getElementById('race-select').value;
            var livingStatus = document.getElementById('living-status-select').value;
            var occupation = document.getElementById('occupation-select').value;
            var gender = document.getElementById('gender-select').value;
    
            fetch('/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: `race=${encodeURIComponent(race)}&living_status=${encodeURIComponent(livingStatus)}&occupation=${encodeURIComponent(occupation)}&gender=${encodeURIComponent(gender)}`
            })
            .then(response => response.json())
            .then(data => {
                // Call updateChart to display the results
                updateChart(data);
            })
            .catch(error => console.error('Error:', error));
        });
    });

