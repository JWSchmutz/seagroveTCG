module.exports = function(sequelize, DataTypes) {
  var Matchups = sequelize.define("Matchup", {
    deck1: {
      type: DataTypes.STRING
    },
    deck2: {
      type: DataTypes.STRING
    },
    pokemon1a: {
      type: DataTypes.STRING
    },
    pokemon1b: {
      type: DataTypes.STRING
    },
    pokemon2a: {
      type: DataTypes.STRING
    },
    pokemon2b: {
      type: DataTypes.STRING
    },
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

  return Matchups;
};
