// cups chart

var ctxSc = document.getElementById("scatterChart").getContext("2d");
var scatterData = {
  datasets: [
    {
      borderColor: "rgba(0, 153, 204, .8)",
      backgroundColor: "rgba(0, 153, 204, .5)",
      label: "Cup",
      data: [
        {
          x: 37,
          y: 13
        },
        {
          x: 8,
          y: 0
        }
      ]
    }
  ]
};
let toBeData = $("#hbsObj")
  .text()
  .split(",,");
console.log(toBeData);
data = [];
for (i = 1; i < toBeData.length; i++) {
  var coordinates = JSON.parse(toBeData[i]);

  data.push(coordinates);
}
scatterData.datasets[0].data = data;

var config1 = new Chart.Scatter(ctxSc, {
  data: scatterData,
  options: {
    title: {
      display: true,
      text: "Players vs Points Needed for Cut"
    },
    scales: {
      xAxes: [
        {
          type: "linear",
          position: "bottom",
          ticks: {
            userCallback: function(tick) {
              // tick = tick / 5;
              console.log(tick);
              var remain =
                tick / Math.pow(10, Math.floor(Chart.helpers.log10(tick)));
              return tick.toString();
            }
          },
          scaleLabel: {
            labelString: "Players",
            display: true
          }
        }
      ],
      yAxes: [
        {
          type: "linear",
          ticks: {
            userCallback: function(tick) {
              // tick = tick * 0.6 + 24;
              return tick.toString();
            }
          },
          scaleLabel: {
            labelString: "Points",
            display: true
          }
        }
      ]
    }
  }
});
