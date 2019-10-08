// cup submit

$("#cup-submit").click(function(e) {
  e.preventDefault();
  var newCup = {
    cupId: $("#cup-id").val() ? $("#cup-id").val() : null,
    division: $("#division").val() ? $("#division").val() : null,
    players: $("#players").val() ? $("#players").val() : null,
    players2: $("#players2").val() ? $("#players2").val() : null,
    rounds: $("#rounds").val() ? $("#rounds").val() : null,
    cutPoints: $("#cut-points").val() ? $("#cut-points").val() : null,
    cutSize: $("#cut-size").val() ? $("#cut-size").val() : null,
    bubbledIn: $("#bubbled-in").val() ? $("#bubbled-in").val() : null,
    bubbledOut: $("#bubbled-out").val() ? $("#bubbled-out").val() : null,
    notes: parseInt($("#notes").val())
  };
  $.post("/api/cups", newCup, function() {
    console.log(newCup);
    console.log("this is happening");
    window.location.replace("localhost:3000");
  });
  $("#cup-id").val(""),
    $("#players").val(""),
    $("#players2").val(""),
    $("#rounds").val(""),
    $("#cut-points").val(""),
    $("#cut-size").val(""),
    $("#bubbled-in").val(""),
    $("#bubbled-out").val(""),
    $("#notes").val("");
});
// force correct cupId format
function formatCupId() {
  return function(e) {
    if (e.keyCode === 8) return;
    var output;
    var input = $("#cup-id").val();
    input = input.replace(/[^0-9]/g, "");
    var year = input.substr(0, 2);
    var day = input.substr(2, 2);
    var id = input.substr(4, 6);
    if (year.length < 2) {
      output = year + "-";
    } else if (year.length === 2 && day.length < 2) {
      output = year + "-" + day;
    } else if (year.length === 2 && day.length == 2) {
      output = year + "-" + day + "-" + id;
    }
    $("#cup-id").val(output);
  };
}

$("#cup-id").keyup(formatCupId());
