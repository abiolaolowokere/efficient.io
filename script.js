var stocks = [];

function submitForm() {
    // Get the stocks from the form
    var stock1 = document.getElementById("stock1").value;
    var stock2 = document.getElementById("stock2").value;
    var stock3 = document.getElementById("stock3").value;
    stock_list = [stock1, stock2, stock3];

    // Send a POST request to the efficient_frontier endpoint
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "http://127.0.0.1:5000/efficient_frontier", true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            // Parse the JSON response
            var data = JSON.parse(xhr.responseText);

            // Create a canvas element to render the chart
            var canvas = document.createElement("canvas");
            canvas.id = "efficient-frontier-chart";
            document.getElementById("chart-container").appendChild(canvas);
            var ctx = canvas.getContext("2d");

            // Plot the chart using chart.js
            var chart = new Chart(ctx, {
                type: 'scatter',
                data: {
                    datasets: [{
                        label: 'Efficient Frontier',
                        data: data.map(function(point) {
                            return {
                                x: point.portfolio_volatility,
                                y: point.portfolio_returns,
                                r: point.portfolio_weights[0] * 10
                            };
                        }),
                        backgroundColor: 'rgba(255, 99, 132, 0.2)',
                        borderColor: 'rgba(255, 99, 132, 1)',
                        pointRadius: 5
                    }]
                },
                options: {
                    scales: {
                        x: {
                            label: 'Volatility'
                        },
                        y: {
                            label: 'Return'
                        }
                    }
                }
            });
        }
    };
    xhr.send(JSON.stringify({ stock_list  : stocks }));
}
