module.exports = function(sequelize, DataTypes) {
  var Decks = sequelize.define("Deck", {
    deck: {
      type: DataTypes.STRING,
      allowNull: false
    },
    pokemon1: {
      type: DataTypes.STRING,
      allowNull: false
    },
    pokemon2: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });

  // Decks.associate = function(models) {
  //   Decks.belongsToMany(models.Deck, {
  //     as: "deckMatchup",
  //     through: models.Matchup
  //   });
  // };

  return Decks;
};
