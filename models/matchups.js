module.exports = function(sequelize, DataTypes) {
  var Matchups = sequelize.define("Matchup", {
    wins: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    losses: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    ties: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  });

  Matchups.associate = function(models) {
    Matchups.belongsTo(models.Deck, {
      as: "deckMatchup"
    });
  };

  return Matchups;
};
