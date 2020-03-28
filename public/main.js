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
// getting matchups obj from front end from handlebars
let matchupsObj = $("#matchupsObject")
  .text()
  .split("-,");

matchupsObj[0] = matchupsObj[0].replace(/^↵+/i, "").trim();
matchupsObj.pop();
matchupsObj = matchupsObj.map(JSON.parse);
// getting decks obj from front end from handlebars
let decks = $("#decksObject")
  .text()
  .split("-,");

decks[0] = decks[0].replace(/^↵+/i, "").trim();
decks.pop();
decks = decks.map(JSON.parse);
const decksMatchups = [];
decks.forEach(function(element) {
  decksMatchups.push({ deck: element, matchups: [] });
});

for (var i = 1; i < decksMatchups.length + 1; i++) {
  for (var j = 0; j < matchupsObj.length; j++) {
    if (decksMatchups[i - 1].deck.deck === matchupsObj[j].deck1) {
      var newMatchup = {
        id: matchupsObj[j].id,
        matchup: matchupsObj[j].deck2,
        wins: matchupsObj[j].wins,
        ties: matchupsObj[j].ties,
        losses: matchupsObj[j].losses
      };
      decksMatchups[i - 1].matchups.push(newMatchup);
    } else if (decksMatchups[i - 1].deck.deck === matchupsObj[j].deck2) {
      var newMatchup = {
        matchup: matchupsObj[j].deck1,
        wins: matchupsObj[j].losses,
        ties: matchupsObj[j].ties,
        losses: matchupsObj[j].wins
      };
      decksMatchups[i - 1].matchups.push(newMatchup);
    }
  }
}

// getting matchupsExp obj from front end from handlebars
let matchupsExpObj = $("#matchupsExpObject")
  .text()
  .split("-,");

matchupsExpObj[0] = matchupsExpObj[0].replace(/^↵+/i, "").trim();
matchupsExpObj.pop();
matchupsExpObj = matchupsExpObj.map(JSON.parse);
// getting decks obj from front end from handlebars
let decksExp = $("#decksExpObject")
  .text()
  .split("-,");

decksExp[0] = decksExp[0].replace(/^↵+/i, "").trim();
decksExp.pop();
decksExp = decksExp.map(JSON.parse);
const decksMatchupsExp = [];
decksExp.forEach(function(element) {
  decksMatchupsExp.push({ deck: element, matchups: [] });
});

for (var i = 1; i < decksMatchupsExp.length + 1; i++) {
  for (var j = 0; j < matchupsExpObj.length; j++) {
    if (decksMatchupsExp[i - 1].deck.deck === matchupsExpObj[j].deck1) {
      var newMatchup = {
        id: matchupsExpObj[j].id,
        matchup: matchupsExpObj[j].deck2,
        wins: matchupsExpObj[j].wins,
        ties: matchupsExpObj[j].ties,
        losses: matchupsExpObj[j].losses
      };
      decksMatchupsExp[i - 1].matchups.push(newMatchup);
    } else if (decksMatchupsExp[i - 1].deck.deck === matchupsExpObj[j].deck2) {
      var newMatchup = {
        matchup: matchupsExpObj[j].deck1,
        wins: matchupsExpObj[j].losses,
        ties: matchupsExpObj[j].ties,
        losses: matchupsExpObj[j].wins
      };
      decksMatchupsExp[i - 1].matchups.push(newMatchup);
    }
  }
}
//////////

$(".matchup-tab").click(function() {
  $(".matchup-tab").removeClass("active-matchup-tab");
  $(this).addClass("active-matchup-tab");
  $(".deck-graph").addClass("d-none");
  $("#" + $(this).attr("data-target")).removeClass("d-none");
});

for (var i = 0; i < decksMatchups.length; i++) {
  for (var j = 0; j < decksMatchups[i].matchups.length; j++) {
    var wins = parseInt(decksMatchups[i].matchups[j].wins);
    var losses = parseInt(decksMatchups[i].matchups[j].losses);
    var ties = parseInt(decksMatchups[i].matchups[j].ties);
    var total = wins + losses + ties;
    var lossesPercentage = (100 * losses) / total;
    var tiesPercentage = (100 * ties) / total;
    var winsPercentage = (100 * wins) / total;
    var matchupLine = $("<div class='matchup-line d-flex'>");
    matchupLine.append(
      `<div class='bg-success graph-bar' style='width:${winsPercentage}%'>`
    );
    matchupLine.append(
      `<div class='bg-warning graph-bar' style='width:${tiesPercentage}%'>`
    );
    matchupLine.append(
      `<div class='bg-danger graph-bar' style='width:${lossesPercentage}%'>`
    );
    $("#deck-graph-" + decksMatchups[i].deck.id).append(matchupLine);
    $("#deck-graph-" + decksMatchups[i].deck.id).append(
      "<h3 class='text-right matchup-name-text'>" +
        decksMatchups[i].matchups[j].matchup +
        "</h3>"
    );
  }
}

$(".matchup-exp-tab").click(function() {
  $(".matchup-exp-tab").removeClass("active-matchup-exp-tab");
  $(this).addClass("active-matchup-exp-tab");
  $(".deck-exp-graph").addClass("d-none");
  $("#" + $(this).attr("data-target")).removeClass("d-none");
});

for (var i = 0; i < decksMatchupsExp.length; i++) {
  for (var j = 0; j < decksMatchupsExp[i].matchups.length; j++) {
    var wins = parseInt(decksMatchupsExp[i].matchups[j].wins);
    var losses = parseInt(decksMatchupsExp[i].matchups[j].losses);
    var ties = parseInt(decksMatchupsExp[i].matchups[j].ties);
    var total = wins + losses + ties;
    var lossesPercentage = (100 * losses) / total;
    var tiesPercentage = (100 * ties) / total;
    var winsPercentage = (100 * wins) / total;
    var matchupLine = $("<div class='matchup-line d-flex'>");
    matchupLine.append(
      `<div class='bg-success graph-bar' style='width:${winsPercentage}%'>`
    );
    matchupLine.append(
      `<div class='bg-warning graph-bar' style='width:${tiesPercentage}%'>`
    );
    matchupLine.append(
      `<div class='bg-danger graph-bar' style='width:${lossesPercentage}%'>`
    );
    $("#deck-exp-graph-" + decksMatchupsExp[i].deck.id).append(matchupLine);
    $("#deck-exp-graph-" + decksMatchupsExp[i].deck.id).append(
      "<h3 class='text-right matchup-name-text'>" +
        decksMatchupsExp[i].matchups[j].matchup +
        "</h3>"
    );
  }
}
