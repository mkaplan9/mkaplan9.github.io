var ctx = document.getElementById('myChart').getContext('2d');

var colors = [
  'rgb(128,0,0)',
  'rgb(139,0,0)',
  'rgb(165,42,42)',
  'rgb(178,34,34)',
  'rgb(220,20,60)',
  'rgb(255,0,0)',
  'rgb(255,99,71)',
  'rgb(255,127,80)',
  'rgb(205,92,92)',
  'rgb(240,128,128)',
  'rgb(233,150,122)',
  'rgb(250,128,114)',
  'rgb(255,160,122)',
  'rgb(255,69,0)',
  'rgb(255,140,0)',
  'rgb(255,165,0)',
  'rgb(255,215,0)',
  'rgb(184,134,11)',
  'rgb(218,165,32)',
  'rgb(238,232,170)',
  'rgb(189,183,107)',
  'rgb(240,230,140)',
  'rgb(128,128,0)',
  'rgb(255,255,0)',
  'rgb(154,205,50)',
  'rgb(85,107,47)',
  'rgb(107,142,35)',
  'rgb(124,252,0)',
  'rgb(127,255,0)',
  'rgb(173,255,47)',
  'rgb(0,100,0)',
  'rgb(0,128,0)',
  'rgb(34,139,34)',
  'rgb(0,255,0)',
  'rgb(50,205,50)',
  'rgb(144,238,144)',
  'rgb(152,251,152)',
  'rgb(143,188,143)',
  'rgb(0,250,154)',
  'rgb(0,255,127)',
  'rgb(46,139,87)',
  'rgb(102,205,170)',
  'rgb(60,179,113)',
  'rgb(32,178,170)',
  'rgb(47,79,79)',
  'rgb(0,128,128)',
  'rgb(0,139,139)',
  'rgb(0,255,255)',
  'rgb(0,255,255)',
  'rgb(224,255,255)',
  'rgb(0,206,209)',
  'rgb(64,224,208)',
  'rgb(72,209,204)',
  'rgb(175,238,238)',
  'rgb(127,255,212)',
  'rgb(176,224,230)',
  'rgb(95,158,160)',
  'rgb(70,130,180)',
  'rgb(100,149,237)',
  'rgb(0,191,255)',
  'rgb(30,144,255)',
  'rgb(173,216,230)',
  'rgb(135,206,235)',
  'rgb(135,206,250)',
  'rgb(25,25,112)',
  'rgb(0,0,128)',
  'rgb(0,0,139)',
  'rgb(0,0,205)',
  'rgb(0,0,255)',
  'rgb(65,105,225)',
  'rgb(138,43,226)',
  'rgb(75,0,130)',
  'rgb(72,61,139)',
  'rgb(106,90,205)',
  'rgb(123,104,238)',
  'rgb(147,112,219)',
  'rgb(139,0,139)',
  'rgb(148,0,211)',
  'rgb(153,50,204)',
  'rgb(186,85,211)',
  'rgb(128,0,128)',
  'rgb(216,191,216)',
  'rgb(221,160,221)',
  'rgb(238,130,238)',
  'rgb(255,0,255)',
  'rgb(218,112,214)',
  'rgb(199,21,133)',
  'rgb(219,112,147)',
  'rgb(255,20,147)',
  'rgb(255,105,180)',
  'rgb(255,182,193)',
  'rgb(255,192,203)',
  'rgb(250,235,215)',
  'rgb(245,245,220)',
  'rgb(255,228,196)',
  'rgb(255,235,205)',
  'rgb(245,222,179)',
  'rgb(255,248,220)',
  'rgb(255,250,205)',
  'rgb(250,250,210)',
  'rgb(255,255,224)',
  'rgb(139,69,19)',
  'rgb(160,82,45)',
  'rgb(210,105,30)',
  'rgb(205,133,63)',
  'rgb(244,164,96)',
  'rgb(222,184,135)',
  'rgb(210,180,140)',
  'rgb(188,143,143)',
  'rgb(255,228,181)',
  'rgb(255,222,173)',
  'rgb(255,218,185)',
  'rgb(255,228,225)'
]

var sAndP = [
  ["1963", 63.10],
  ["1964", 75.02],
  ["1965", 84.75],
  ["1966", 92.43],
  ["1967", 80.33],
  ["1968", 96.47],
  ["1969", 103.86],
  ["1970", 92.06],
  ["1971", 92.15],
  ["1972", 102.09],
  ["1973", 118.06],
  ["1974", 97.55],
  ["1975", 68.65],
  ["1976", 90.19],
  ["1977", 107.46],
  ["1978", 95.10],
  ["1979", 96.11],
  ["1980", 107.94],
  ["1981", 135.76],
  ["1982", 122.55],
  ["1983", 140.65],
  ["1984", 164.93],
  ["1985", 167.20],
  ["1986", 211.28],
  ["1987", 242.17],
  ["1988", 247.10],
  ["1989", 277.72],
  ["1990", 353.40],
  ["1991", 330.20],
  ["1992", 417.03],
  ["1993", 435.70],
  ["1994", 466.51],
  ["1995", 459.21],
  ["1996", 615.93],
  ["1997", 740.74],
  ["1998", 970.43],
  ["1999", 1229.23],
  ["2000", 1469.25],
  ["2001", 1320.28],
  ["2002", 1148.08],
  ["2003", 879.82],
  ["2004", 1111.92],
  ["2005", 1211.92],
  ["2006", 1248.29],
  ["2007", 1418.03],
  ["2008", 1467.97],
  ["2009", 902.99],
  ["2010", 1116.56],
  ["2011", 1257.62],
  ["2012", 1258.86],
  ["2013", 1426.19],
  ["2014", 1845.86],
  ["2015", 2058.90],
  ["2016", 2038.20],
  ["2017", 2251.57],
  ["2018", 2683.73],
  ["Spacer", "Spacer"]
]

var dividends = [
  ["1963", 2.14],
  ["1964", 2.3],
  ["1965", 2.52],
  ["1966", 2.74],
  ["1967", 2.88],
  ["1968", 2.93],
  ["1969", 3.08],
  ["1970", 3.16],
  ["1971", 3.13],
  ["1972", 3.07],
  ["1973", 3.16],
  ["1974", 3.4],
  ["1975", 3.62],
  ["1976", 3.68],
  ["1977", 4.1],
  ["1978", 4.71],
  ["1979", 5.11],
  ["1980", 5.7],
  ["1981", 6.2],
  ["1982", 6.66],
  ["1983", 6.88],
  ["1984", 7.12],
  ["1985", 7.57],
  ["1986", 7.94],
  ["1987", 8.3],
  ["1988", 8.86],
  ["1989", 9.81],
  ["1990", 11.14],
  ["1991", 12.11],
  ["1992", 12.24],
  ["1993", 12.41],
  ["1994", 12.62],
  ["1995", 13.18],
  ["1996", 13.89],
  ["1997", 14.95],
  ["1998", 15.55],
  ["1999", 16.28],
  ["2000", 16.71],
  ["2001", 16.17],
  ["2002", 15.74],
  ["2003", 16.12],
  ["2004", 17.6],
  ["2005", 19.7],
  ["2006", 22.41],
  ["2007", 25.08],
  ["2008", 27.92],
  ["2009", 28.01],
  ["2010", 22.24],
  ["2011", 22.96],
  ["2012", 26.74],
  ["2013", 31.54],
  ["2014", 35.4],
  ["2015", 39.9],
  ["2016", 43.55],
  ["2017", 45.93],
  ["2018", 49.29],
  ["Spacer", "Spacer"]
]

var bonds = [
  ["1963", 4.00],
  ["1964", 4.19],
  ["1965", 4.28],
  ["1966", 4.93],
  ["1967", 5.07],
  ["1968", 5.64],
  ["1969", 6.67],
  ["1970", 7.35],
  ["1971", 6.16],
  ["1972", 6.21],
  ["1973", 6.85],
  ["1974", 7.56],
  ["1975", 7.99],
  ["1976", 7.61],
  ["1977", 7.42],
  ["1978", 8.41],
  ["1979", 9.43],
  ["1980", 11.43],
  ["1981", 13.92],
  ["1982", 13.01],
  ["1983", 11.10],
  ["1984", 12.46],
  ["1985", 10.62],
  ["1986", 7.67],
  ["1987", 8.39],
  ["1988", 8.85],
  ["1989", 8.49],
  ["1990", 8.55],
  ["1991", 7.86],
  ["1992", 7.01],
  ["1993", 5.87],
  ["1994", 7.09],
  ["1995", 6.57],
  ["1996", 6.44],
  ["1997", 6.35],
  ["1998", 5.26],
  ["1999", 5.65],
  ["2000", 6.03],
  ["2001", 5.02],
  ["2002", 4.61],
  ["2003", 4.01],
  ["2004", 4.27],
  ["2005", 4.29],
  ["2006", 4.80],
  ["2007", 4.63],
  ["2008", 3.66],
  ["2009", 3.26],
  ["2010", 3.22],
  ["2011", 2.78],
  ["2012", 1.80],
  ["2013", 2.35],
  ["2014", 2.54],
  ["2015", 2.14],
  ["2016", 1.84],
  ["2017", 2.33],
  ["2018", 2.91],
  ["Spacer", "Spacer"]
]

var dates = sAndP.map(x => x[0]);
var sAndPPrices = sAndP.map(x => x[1]);
var bondYields = bonds.map(x => x[1]);
var dividendTotals = dividends.map(x => x[1]);
var startIndex = 0
var endIndex = -1
var startingAmount = 1000
var addAmount = 100
var percentStocks = 70
var withDividends = true

var config = {
  // The type of chart we want to create
  type: 'line',

  // The data for our dataset
  data: {
    labels: dates.slice(0, -1),
    datasets: []
  },

  // Configuration options go here
  options: {
    title: {
      display: true,
      text: 'Asset Allocation'
    },
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true
        }
      }]
    }
  }
}

document.getElementById('startingAmountButton').addEventListener('click', function() {
	startingAmount = parseFloat(document.getElementById('startingAmount').value)
  config.data.datasets.forEach(function(dataset) {
    dataset.data = getNewLine(dataset.percentStocks, startIndex, endIndex)
	});
  chart.update()
});

document.getElementById('withDividends').addEventListener('click', function() {
  withDividends = document.getElementById('withDividends').checked
  config.data.datasets.forEach(function(dataset) {
    dataset.data = getNewLine(dataset.percentStocks, startIndex, endIndex)
	});
  chart.update()
});

document.getElementById('addAmountButton').addEventListener('click', function() {
	addAmount = parseFloat(document.getElementById('addAmount').value)
  config.data.datasets.forEach(function(dataset) {
    dataset.data = getNewLine(dataset.percentStocks, startIndex, endIndex)
	});
  chart.update()
});

document.getElementById('addLine').addEventListener('click', function() {
  percentStocks = parseFloat(document.getElementById('percentStocks').value)
  addLine(percentStocks)
});

function addLine(percentStocks) {
  if(percentStocks <= 100 && percentStocks >= 0) {
    var newLine = getNewLine(percentStocks, startIndex, endIndex)
    var colorIndex = Math.floor(Math.random() * colors.length)

  	config.data.datasets.push({
      label: `${percentStocks}% stocks/${100 - percentStocks}% bonds`,
      borderColor: colors[colorIndex],
      data: newLine,
      percentStocks: percentStocks,
      fill: false
    })
  	chart.update();
  }
}

document.getElementById('clear').addEventListener('click', function() {
	clear()
});

function clear() {
  config.data.datasets = []
	chart.update();
}

document.getElementById('dateButton').addEventListener('click', function() {
  var startDate = document.getElementById('startDate').value
  startIndex = dates.indexOf(startDate)
  var endDate = document.getElementById('endDate').value
  endIndex = dates.indexOf(endDate)

  if(startIndex >= endIndex) {
    startIndex = 0
    endIndex = -2
  }
  if(startIndex < 0) {
    startIndex = 0
  }
  if(endIndex < 0) {
    endIndex = -2
  }
  endIndex = endIndex + 1 // Inclusive end

  config.data.labels = dates.slice(startIndex, endIndex);
	config.data.datasets.forEach(function(dataset) {
    dataset.data = getNewLine(dataset.percentStocks, startIndex, endIndex)
	});

	chart.update();
});

function getNewLine(percentStocks, startIndex, endIndex) {
  var decimalStocks = percentStocks / 100
  var decimalBonds = 1 - decimalStocks
  var stockReference = sAndPPrices.slice(startIndex, endIndex)
  var bondReference = bondYields.slice(startIndex, endIndex)
  var dividendReference = dividendTotals.slice(startIndex, endIndex)
  var stockValue
  var bondValue
  var total = startingAmount
  var newLine = [total + addAmount]

  var iters = stockReference.length
  for (iter = 0; iter < iters; iter++) {
    if(iter + 1 == iters) {
      break
    }

    total = total + addAmount
    stockValue = total * decimalStocks
    bondValue = total * decimalBonds

    var stockPerformance = stockReference[iter + 1] / stockReference[iter]
    var bondPerformance = 1 + bondReference[iter] / 100
    var dividendPerformance = dividendReference[iter + 1] / stockReference[iter + 1]

    var endStock = stockValue * (stockPerformance + (dividendPerformance * withDividends))
    var endBond = bondValue * bondPerformance

    total = endStock + endBond

    newLine.push(total)
  }

  return newLine
}

var chart = new Chart(ctx, config);
addLine(percentStocks)
