const express = require("express");
const router = express.Router();

const db = require("../models");

// get route -> index
router.get("/", function(req, res) {
  // replace old function with sequelize function
  db.Cup.findAll({
    // include: [db.Customer],
    // Here we specify we want to return our cups in ordered by ascending cup_name
    order: [["players", "ASC"]]
  })
    // use promise method to pass the cups...
    .then(function(dbCup) {
      console.log(dbCup);
      // into the main index, updating the page
      var hbsObject = {
        cup: dbCup,
        jsFile: "main"
      };
      return res.render("index", hbsObject);
    });
});

// get route, edited to match sequelize
router.get("/admin/cups", function(req, res) {
  // send us to the next get function instead.
  res.render("cups", { jsFile: "cups" });
});

// post route to create cups
router.post("/api/cups", function(req, res) {
  console.log(req.body);
  // edited cup create to add in a cup_name
  db.Cup.create(req.body)
    // pass the result of our call
    .then(function(dbCup) {
      // log the result to our terminal/bash window
      res.redirect("/");
    });
});

router.get("/matchups", function(req, res) {
  db.Matchups.findAll()
    // use promise method to pass the cups...
    .then(function(matchups) {
      // into the main index, updating the page
      var hbsObject = {
        matchup: matchups,
        jsFile: "matchups"
      };
      console.log(hbsObject.matchup[0]);
      return res.render("matchups", hbsObject);
    });
});

// post route to create cups
router.post("/api/cups", function(req, res) {
  console.log(req.body);
  // edited cup create to add in a cup_name
  db.Cup.create(req.body)
    // pass the result of our call
    .then(function(dbCup) {
      // log the result to our terminal/bash window
      res.redirect("/");
    });
});

// put route to devour a cup
router.put("/cups/update", function(req, res) {
  // If we are given a customer, create the customer and give them this devoured cup
  if (req.body.customer) {
    db.Customer.create({
      customer: req.body.customer,
      CupId: req.body.cup_id
    })
      .then(function(dbCustomer) {
        return db.Cup.update(
          {
            devoured: true
          },
          {
            where: {
              id: req.body.cup_id
            }
          }
        );
      })
      .then(function(dbCup) {
        res.json("/");
      });
  }
  // If we aren't given a customer, just update the cup to be devoured
  else {
    db.Cup.update(
      {
        devoured: true
      },
      {
        where: {
          id: req.body.cup_id
        }
      }
    ).then(function(dbCup) {
      res.json("/");
    });
  }
});

module.exports = router;