// cup submit

$("#deck-submit").click(function(e) {
  e.preventDefault();
  var newDeck = {
    deck: $("#deck-name")
      .val()
      .trim()
      ? $("#deck-name")
          .val()
          .trim()
      : null,
    pokemon1: $("#pokemon1")
      .val()
      .trim()
      ? $("#pokemon1")
          .val()
          .trim()
      : null,
    pokemon2: $("#pokemon2")
      .val()
      .trim()
      ? $("#pokemon2")
          .val()
          .trim()
      : null
  };
  console.log(newDeck);
  $.post("/api/decks", newDeck, function() {
    console.log(newDeck);
    $("#pokemon2").val("");
    $("#pokemon1").val("");
    $("#deck-name").val("");
  });
});

function search() {
  $("#holder").empty();
  var url = "https://api.pokemontcg.io/v1/cards?";
  url +=
    "name=" +
    $("#card-lookup")
      .val()
      .trim();
  fetch(url)
    .then(data => data.json())
    .then(res => {
      console.log(res);
      for (let i = 0; i < res.cards.length; i++) {
        const img = $("<img>");
        img.attr("src", res.cards[i].imageUrl);
        img.addClass("pkmn-card-img");
        $("#holder").append(img);
      }
    });
}

$("#card-submit").click(search);
$("#holder").on("click", ".pkmn-card-img", function() {
  if (!$("#pokemon1").val()) {
    $("#pokemon1").val($(this).attr("src"));
  } else {
    $("#pokemon2").val($(this).attr("src"));
  }
});
