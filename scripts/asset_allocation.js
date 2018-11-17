var ctx = document.getElementById('myChart').getContext('2d');

var colors = [
  'rgb(222, 130, 50)',
  'rgb(0, 180, 175)',
  'rgb(0, 172, 252)',
  'rgb(35, 99, 132)',
  'rgb(35, 9, 132)',
  'rgb(114, 0, 0)',
  'rgb(0, 53, 0)',
  'rgb(35, 200, 0)',
  'rgb(0, 211, 186)',
  'rgb(230, 124, 255)',
  'rgb(255, 44, 162)',
  'rgb(200, 200, 0)',
  'rgb(0, 223, 121)',
  'rgb(91, 191, 255)',
  'rgb(255, 136, 255)'
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
var bondPrices = bonds.map(x => x[1]);
var startIndex = 0
var endIndex = -1

var config = {
  // The type of chart we want to create
  type: 'line',

  // The data for our dataset
  data: {
    labels: dates.slice(0, -1),
    datasets: [{
      label: "100% S&P",
      borderColor: 'rgb(255, 99, 132)',
      data: sAndPPrices.slice(0, -1),
      percentStocks: 100,
      fill: false
    }]
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

document.getElementById('addLine').addEventListener('click', function() {
  var percentStocks = document.getElementById('percentStocks').value
  if(percentStocks <= 100 && percentStocks >= 0) {
    var newLine = getNewLine(percentStocks, startIndex, endIndex)
    var colorIndex = Math.floor(Math.random() * colors.length)

  	config.data.datasets.push({
      label: `${percentStocks}% S&P`,
      borderColor: colors[colorIndex],
      data: newLine,
      percentStocks: percentStocks,
      fill: false
    })
  	chart.update();
  }
});

document.getElementById('clear').addEventListener('click', function() {
	config.data.datasets = []
	chart.update();
});

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

  # replace with several calls to newline
	config.data.datasets.forEach(function(dataset) {
    var newLine = sAndPPrices.slice(startIndex, endIndex)
    newLine = newLine.map(function(el) { return el * dataset.percentStocks / 100 })
    dataset.data = newLine
	});

	chart.update();
});

function getLine(percentStocks, startIndex, endIndex) {
  var decimalStocks = percentStocks / 100
  var decimalBonds = 1 - decimalStocks
  var stockReference = sAndPPrices.slice(startIndex, endIndex)
  var bondsReference = bondPrices.slice(startIndex, endIndex)
  var stockValue
  var bondValue
  var total = 100
  var newLine = []

  var iters = stockReference.length
  iters.forEach(function(iter) {
    if(iter + 1 == iters) {
      return
    }

    stockValue = total * decimalStocks
    bondValue = total * decimalBonds

    var stockPerformance = stockReference[iter + 1] / stockReference[iter]
    var bondPerformance = bondReference[iter + 1] / bondReference[iter]

    var endStock = stockValue * stockPerformance
    var endBond = bondValue * bondPerformance

    total = endStock + endBond

    newLine.push(total)
  })

  return newLine
}


var chart = new Chart(ctx, config);
