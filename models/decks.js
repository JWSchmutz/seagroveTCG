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

  return Decks;
};
