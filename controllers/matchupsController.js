const express = require("express");
const router = express.Router();
const axios = require("axios");

const db = require("../models");

router.get("/admin/decks", (req, res) => {
  // send us to the next get function instead.
  res.render("matchups2", { jsFile: "matchups2" });
});

router.post("/api/decks", (req, res) => {
  db.Deck.create(req.body).then(function(deck) {
    db.Deck.findAll().then(decks => {
      console.log(decks.length);
      const newMatchups = [];
      for (var i = 0; i < decks.length - 1; i++) {
        const newMatchup = {};

        newMatchup.deck1 = decks[decks.length - 1].dataValues.deck;
        newMatchup.deck2 = decks[i].dataValues.deck;
        newMatchup.pokemon1a = decks[decks.length - 1].dataValues.pokemon1;
        newMatchup.pokemon1b = decks[decks.length - 1].dataValues.pokemon2;
        newMatchup.pokemon2a = decks[i].dataValues.pokemon1;
        newMatchup.pokemon2b = decks[i].dataValues.pokemon2;

        newMatchups.push(newMatchup);
      }
      // console.log(newMatchups);
      db.Matchup.bulkCreate(newMatchups);
      res.redirect("/admin/matchups");
    });
  });
});

router.put("/api/matchups", (req, res, next) => {
  console.log(req.body);
  let winsQuery;
  let lossesQuery;
  let tiesQuery;
  const promises = [];
  if (req.body.wins.length) {
    winsQuery = db.Matchup.increment("wins", { where: { id: req.body.wins } });
    promises.push(winsQuery);
  }
  if (req.body.losses.length) {
    lossesQuery = db.Matchup.increment("losses", {
      where: { id: req.body.losses }
    });
    promises.push(winsQuery);
  }
  if (req.body.ties.length) {
    tiesQuery = db.Matchup.increment("ties", { where: { id: req.body.ties } });
    promises.push(winsQuery);
  }
  Promise.all(promises)
    .then(responses => {
      res.end();
    })
    .catch(err => {
      console.log("**********ERROR RESULT****************");
      console.log(err);
    });
});

router.get("/matchups", (req, res) => {
  db.Matchup.findAll({}).then(matchups => {
    // use promise method to pass the cups...
    // into the main index, updating the page
    var matchupsMinified = [];
    for (var i = 0; i < matchups.length; i++) {
      matchupsMinified.push(matchups[i].dataValues);
    }
    console.log(matchupsMinified);
    const hbsObject = {
      jsFile: "matchups",
      matchups: matchupsMinified
    };
    console.log(hbsObject.matchups);

    // for (let i = 0; i < pkmnImages.length; i++) {
    //   images[pkmnImages[i].id] = pkmnImages[i].imageUrl;
    // }

    return res.render("matchups", hbsObject);
  });
});

module.exports = router;
