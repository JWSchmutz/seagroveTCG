const express = require("express");
const app = express();

const exphbs = require("express-handlebars");

const db = require("./models");

app.use(express.static("public"));
// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main"
  })
);
app.set("view engine", "handlebars");

const cupRoutes = require("./controllers/cupsController");
const matchupRoutes = require("./controllers/matchupsController");
app.use(cupRoutes);
app.use(matchupRoutes);
// listen on port 3000
const PORT = process.env.PORT || 3000;
db.sequelize.sync().then(function() {
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
});
