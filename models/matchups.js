module.exports = function(sequelize, DataTypes) {
  var Matchups = sequelize.define("Matchups", {
    deck1: {
      type: DataTypes.STRING,
      allowNull: false
    },
    deck2: {
      type: DataTypes.STRING,
      allowNull: false
    },
    win: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    loss: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    tie: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    pokemon1a: {
      type: DataTypes.STRING,
      allowNull: false
    },
    pokemon1b: {
      type: DataTypes.STRING,
      allowNull: false
    },
    pokemon2a: {
      type: DataTypes.STRING,
      allowNull: false
    },
    pokemon2b: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });
  return Matchups;
};
