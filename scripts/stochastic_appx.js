var baseChart = document.getElementById('myChart').getContext('2d');

var _strFormula = "x^3";
var _ticks = 10;
var _orange = 'rgb(247, 142, 98)';
var _yellow = 'rgb(255, 204, 0)';
var _totalPointsUnderPos = 0;
var _totalPointsOverPos = 0;
var _totalPointsUnderNeg = 0;
var _totalPointsOverNeg = 0;
var _totalPoints = [0];
var _calculatedIntegral = '';

function enteredFunction(x) {
  newY = math.evaluate(_strFormula, {x: x});
  return newY;
}

function denseX() {
  return [...Array(_ticks + 1).keys()];
}

function graphFunction() {
  var xVals = denseX();
  var data = xVals.map(x => ({x: x, y: enteredFunction(x)}));
  return data
}

function maxY() {
  return Math.max(0, Math.max(...denseX().map(x => enteredFunction(x))));
}

function minY() {
  return Math.min(0, Math.min(...denseX().map(x => enteredFunction(x))));
}

function generatePoint() {
  randomX = Math.random() * _ticks;
  randomY = Math.random() * (maxY() - minY()) + minY();
  yVal = enteredFunction(randomX)

  return {pt: {x: randomX, y: randomY}, yVal}
}

document.getElementById('graph').addEventListener('click', function() {
  _strFormula = document.getElementById('strFormula').value
  graph()
});

function graph() {
  line = config.data.datasets[0];
  line.label = _strFormula;
  line.data = graphFunction();

  config.data.datasets = [line];
  _totalPointsUnderPos = 0;
  _totalPointsOverPos = 0;
  _totalPointsUnderNeg = 0;
  _totalPointsOverNeg = 0;
  _totalPoints = [0];
  _calculatedIntegral = '';

  updateWolfram()
  render();
}

document.getElementById('simulate').addEventListener('click', function() {
  numPoints = parseFloat(document.getElementById('numPoints').value)
  simulate(numPoints)
});

document.getElementById('clear').addEventListener('click', function() {
  graph()
});

function simulate(numPoints) {
  if(numPoints <= 10000 && numPoints >= 0) {
    points = [...Array(numPoints).keys()].map(x => generatePoint())
    pointsUnderPos = points.filter(point => (point.pt.y < point.yVal) && (point.pt.y > 0)).map(point => point.pt)
    pointsOverPos = points.filter(point => (point.pt.y >= point.yVal) && (point.pt.y > 0)).map(point => point.pt)
    pointsUnderNeg = points.filter(point => (point.pt.y > point.yVal) && (point.pt.y < 0)).map(point => point.pt)
    pointsOverNeg = points.filter(point => (point.pt.y <= point.yVal) && (point.pt.y < 0)).map(point => point.pt)

    console.log("asdfsadfasdf")
    if(config.data.datasets.length === 1) {
      config.data.datasets.push({
        label: "Points Under",
        borderColor: _orange,
        pointBackgroundColor: _orange,
        data: pointsUnderPos.concat(pointsUnderNeg),
        fill: false,
        showLine: false
      })
      config.data.datasets.push({
        label: "Points Over",
        borderColor: _yellow,
        pointBackgroundColor: _yellow,
        data: pointsOverPos.concat(pointsOverNeg),
        fill: false,
        showLine: false
      })
    } else {
      config.data.datasets.push({
        label: "Points Under",
        borderColor: _orange,
        pointBackgroundColor: _orange,
        data: pointsUnderPos.concat(pointsUnderNeg),
        fill: false,
        showLine: false
      })
      config.data.datasets.push({
        label: "Points Over",
        borderColor: _yellow,
        pointBackgroundColor: _yellow,
        data: pointsOverPos.concat(pointsOverNeg),
        fill: false,
        showLine: false
      })
    }


    _totalPointsUnderPos += pointsUnderPos.length;
    _totalPointsOverPos += pointsOverPos.length;
    _totalPointsUnderNeg += pointsUnderNeg.length;
    _totalPointsOverNeg += pointsOverNeg.length;
    _totalPoints = [_totalPoints[_totalPoints.length - 1] + numPoints]
    _calculatedIntegralPos = (_totalPointsUnderPos / _totalPoints[_totalPoints.length - 1]) * (_ticks * (maxY() - minY()))
    _calculatedIntegralNeg = (_totalPointsUnderNeg / _totalPoints[_totalPoints.length - 1]) * (_ticks * (maxY() - minY()))
    _calculatedIntegral = _calculatedIntegralPos - _calculatedIntegralNeg

    console.log(_calculatedIntegralPos)
    console.log(_calculatedIntegralNeg)



    updatePoints()
    updateIntegral()

    chart.update();
  }
}

function updatePoints() {
  document.getElementById('totalPoints').innerHTML = _totalPoints[_totalPoints.length - 1];
}

function updateIntegral() {
  document.getElementById('calculatedIntegral').innerHTML = Math.round(_calculatedIntegral * 100) / 100;
}

function updateWolfram() {
  document.getElementById('wolframLink').href = `https://www.wolframalpha.com/input/?i=integral+of+${encodeURIComponent(_strFormula)}+from+0+to+10`;
}

function render() {
  chart.update();
  updatePoints();
  updateIntegral();
}


var config = {
  // The type of chart we want to create
  type: 'line',
  labels: denseX(),

  // The data for our dataset
  data: {
    datasets: [{
      label: _strFormula,
      borderColor: 'rgb(255, 99, 132)',
      data: graphFunction(),
      fill: false
    }]
  },

  // Configuration options go here
  options: {
    legend: {
      display: false
    },
    title: {
      display: true,
      text: 'Stochastic Approximation'
    },
    scales: {
      yAxes: [{
        _ticks: {
          beginAtZero: true,
        }
      }],
      xAxes: [{
        type: 'linear',
        position: 'bottom'
      }]
    }
  }
}

var chart = new Chart(baseChart, config);
