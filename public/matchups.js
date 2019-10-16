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
  // console.log(updates);
  // $.ajax({
  //   url: "/api/matchups",
  //   type: "PUT",
  //   data: updates
  // });
  console.log(Date.now());
  localStorage.setItem("canVote", Date.now());
});

if (Date.now() - parseInt(localStorage.getItem("canVote")) < 500000) {
  $(".btn-success").text("Only vote once per week.");
  $(".btn-success").attr("disabled", true);
}
