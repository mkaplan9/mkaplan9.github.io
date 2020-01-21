var ctx = document.getElementById('myChart').getContext('2d');

var strFormula = "x^3"
var ticks = 10
var orange = 'rgb(247, 142, 98)'
var yellow = 'rgb(255, 204, 0)'

function enteredFunction(x) {
  newY = math.evaluate(strFormula, {x: x})
  return newY
}

function denseX() {
  return [...Array(ticks + 1).keys()]
}

function graphFunction() {
  var xVals = denseX()
  var data = xVals.map(x => ({x: x, y: enteredFunction(x)}));
  return data
}

function generatePoint() {
  randomX = Math.random() * ticks;
  randomY = Math.random() * enteredFunction(ticks);
  yVal = enteredFunction(randomX)

  return {pt: {x: randomX, y: randomY}, yVal}
}

document.getElementById('graph').addEventListener('click', function() {
  strFormula = document.getElementById('strFormula').value
  graph()
});

function graph() {
  config.data.datasets[0].label = strFormula
  config.data.datasets[0].data = graphFunction()
  chart.update();
}

document.getElementById('simulate').addEventListener('click', function() {
  numPoints = parseFloat(document.getElementById('numPoints').value)
  simulate(numPoints)
});

function simulate(numPoints) {
  if(numPoints <= 10000 && numPoints >= 0) {
    points = [...Array(numPoints).keys()].map(x => generatePoint())
    pointsUnder = points.filter(point => point.pt.y < point.yVal).map(point => point.pt)
    pointsOver = points.filter(point => point.pt.y >= point.yVal).map(point => point.pt)

    if(config.data.datasets.length === 1) {
      config.data.datasets.push({
        label: "Points Under",
        borderColor: orange,
        pointBackgroundColor: orange,
        data: pointsUnder,
        fill: false,
        showLine: false
      })
      config.data.datasets.push({
        label: "Points Over",
        borderColor: yellow,
        pointBackgroundColor: yellow,
        data: pointsOver,
        fill: false,
        showLine: false
      })
    } else {
      pointsUnder = config.data.datasets[1].data.concat(pointsUnder)
      pointsOver = config.data.datasets[2].data.concat(pointsOver)
      config.data.datasets[1] = {
        label: "Points Under",
        borderColor: orange,
        pointBackgroundColor: orange,
        data: pointsUnder,
        fill: false,
        showLine: false
      }
      config.data.datasets[2] = {
        label: "Points Over",
        borderColor: yellow,
        pointBackgroundColor: yellow,
        data: pointsOver,
        fill: false,
        showLine: false
      }
    }

    totalPoints = pointsUnder.length + pointsOver.length
    areaUnderCurve = (pointsUnder.length / totalPoints) * (ticks * enteredFunction(ticks))
    updatePoints(totalPoints)
    updateIntegral(areaUnderCurve)

    chart.update();
  }
}

function updatePoints(totalPoints) {
  document.getElementById('totalPoints').innerHTML = totalPoints
}

function updateIntegral(areaUnderCurve) {
  document.getElementById('calculatedIntegral').innerHTML = areaUnderCurve
}


var config = {
  // The type of chart we want to create
  type: 'line',
  labels: denseX(),

  // The data for our dataset
  data: {
    datasets: [{
      label: strFormula,
      borderColor: 'rgb(255, 99, 132)',
      data: graphFunction(),
      fill: false
    }]
  },

  // Configuration options go here
  options: {
    title: {
      display: true,
      text: 'Stochastic Approximation'
    },
    scales: {
      yAxes: [{
        ticks: {
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

var chart = new Chart(ctx, config);
