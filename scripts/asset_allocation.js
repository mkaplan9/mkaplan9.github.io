var ctx = document.getElementById('myChart').getContext('2d');

var sAndP = [
  ["1956", 45.16],
  ["1957", 46.20],
  ["1958", 40.33],
  ["1959", 55.44],
  ["1960", 59.91],
  ["1961", 57.57],
  ["1962", 71.55],
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

var dates = sAndP.map(x => x[0]);
var prices = sAndP.map(x => x[1]);

var config = {
    // The type of chart we want to create
    type: 'line',

    // The data for our dataset
    data: {
        labels: dates.slice(0, -1),
        datasets: [{
            label: "Raw S&P",
            borderColor: 'rgb(255, 99, 132)',
            data: prices.slice(0, -1),
        }]
    },

    // Configuration options go here
    options: {
        title: {
            display: true,
            text: 'Asset Allocation'
        }
    }
}

document.getElementById('dateButton').addEventListener('click', function() {
  var startDate = document.getElementById('startDate').value
  var startIndex = dates.indexOf(startDate)
  var endDate = document.getElementById('endDate').value
  var endIndex = dates.indexOf(endDate)

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
		dataset.data = prices.slice(startIndex, endIndex);
	});

	chart.update();
});


var chart = new Chart(ctx, config);
