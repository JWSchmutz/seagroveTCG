$(".vote-btn").on("click", function() {
  $(this)
    .parent()
    .parent()
    .find(".vote-btn")
    .removeClass("active");
  $(this).addClass("active");
});

$(".btn-success").on("click", function() {
  var updates = {
    wins: [],
    ties: [],
    losses: []
  };
  $(".btn.active").each(function() {
    var newVotes = {
      matchup: parseInt(
        $(this)
          .attr("id")
          .split("-")[1]
      ),
      opinion: $(this)
        .attr("id")
        .split("-")[0]
    };
    updates[newVotes.opinion].push(newVotes.matchup);
  });
  if ($(this).attr("id") === "standard-vote") {
    $.ajax({
      url: "/api/matchups",
      type: "PUT",
      data: updates,
      success: function() {
        window.location.href = "/";
      }
    });
    localStorage.setItem("canVote", Date.now());
  } else {
    $.ajax({
      url: "/api/matchupsExp",
      type: "PUT",
      data: updates,
      success: function() {
        window.location.href = "/";
      }
    });
    localStorage.setItem("canVote", Date.now());
  }
});
if (Date.now() - parseInt(localStorage.getItem("canVote")) < 500000000) {
  $("#standard-vote").text("Only vote once per week.");
  $("#standard-vote").attr("disabled", true);
}
if (
  Date.now() - parseInt(localStorage.getItem("canVoteExpanded")) <
  500000000
) {
  $("#expanded-vote").text("Only vote once per week.");
  $("#expanded-vote").attr("disabled", true);
}
