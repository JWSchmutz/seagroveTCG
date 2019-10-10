const express = require("express");
const router = express.Router();
const axios = require("axios");

const db = require("../models");

router.get("/admin/matchups", (req, res) => {
  // send us to the next get function instead.
  res.render("matchups2", { jsFile: "matchups2" });
});

router.post("/api/matchups", (req, res) => {
  db.Deck.create(req.body).then(function(dbCup) {
    res.redirect("/");
  });
});

router.get("/matchups", (req, res) => {
  db.Deck.findAll({
    include: [
      {
        model: db.Deck,
        as: "deckMatchup"
      }
    ]
  })
    .then(matchups => {
      console.log(matchups);
    })
    // use promise method to pass the cups...
    .then(function(matchups) {
      const cardsToGrab = [];
      for (let i = 0; i < matchups.length; i++) {
        if (!cardsToGrab.includes(matchups[i].dataValues.pokemon1a)) {
          cardsToGrab.push(matchups[i].dataValues.pokemon1a);
        }
        if (!cardsToGrab.includes(matchups[i].dataValues.pokemon1b)) {
          cardsToGrab.push(matchups[i].dataValues.pokemon1b);
        }
        if (!cardsToGrab.includes(matchups[i].dataValues.pokemon2a)) {
          cardsToGrab.push(matchups[i].dataValues.pokemon2a);
        }
        if (!cardsToGrab.includes(matchups[i].dataValues.pokemon2b)) {
          cardsToGrab.push(matchups[i].dataValues.pokemon2b);
        }
      }
      const urlEnd = cardsToGrab.join("|");
      let pkmnImages;
      let url = "https://api.pokemontcg.io/v1/cards?id=" + urlEnd;
      axios.get(url).then(response => {
        pkmnImages = response.data.cards;

        // into the main index, updating the page
        const hbsObject = {
          matchup: matchups,
          jsFile: "matchups"
        };
        console.log(matchups[0].dataValues);
        // for (let i = 0; i < pkmnImages.length; i++) {
        //   images[pkmnImages[i].id] = pkmnImages[i].imageUrl;
        // }

        return res.render("matchups", hbsObject);
      });
    });
});

module.exports = router;

// for (let i = 0; i < res.cards.length; i++) {
//   const img = $("<img>");
//   img.attr("src", res.cards[i].imageUrl);
//   if (i % 2) {
//     img.addClass("pkmn-card-even");
//   } else {
//     img.addClass("pkmn-card-odd");
//   }
//   if (i < 2) {
//     $("#card-holder-1-1").append(img);
//   } else {
//     $("#card-holder-1-2").append(img);
//   }
// }
//   });
