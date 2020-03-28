module.exports = function(sequelize, DataTypes) {
  var DecksExp = sequelize.define("DeckExp", {
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

  return DecksExp;
};
