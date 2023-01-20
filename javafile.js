var stock1 = document.getElementById("stock1").value;
var stock2 = document.getElementById("stock2").value;
var stock3 = document.getElementById("stock3").value;

var yfinance = require("yfinance");

yfinance.getInfo(stock1).then(info => {
  console.log(info);
});

yfinance.getInfo(stock2).then(info => {
  console.log(info);
});

yfinance.getInfo(stock3).then(info => {
  console.log(info);
});

var plotly = require("plotly")(username, apiKey);

var data = [{
  x: [stock1 data],
  y: [stock1 data],
  mode: 'markers',
  type: 'scatter',
  name: stock1
}, {
  x: [stock2 data],
  y: [stock2 data],
  mode: 'markers',
  type: 'scatter',
  name: stock2
}, {
  x: [stock3 data],
  y: [stock3 data],
  mode: 'markers',
  type: 'scatter',
  name: stock3
}];

var layout = {
  title: 'Efficient Frontier',
  xaxis: {
    title: 'Risk'
  },
  yaxis: {
    title: 'Return'
  }
};

plotly.plot(data, layout, function (err, msg) {
  if (err) return console.log(err);
  console.log(msg);
});
