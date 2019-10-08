module.exports = function(sequelize, DataTypes) {
  var Cup = sequelize.define("Cup", {
    cupId: {
      type: DataTypes.STRING,
      allowNull: false
    },
    division: {
      type: DataTypes.STRING,
      allowNull: false
    },
    players: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    players2: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    rounds: {
      type: DataTypes.INTEGER,
      allowNull: false,
      min: 3
    },
    cutPoints: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    cutSize: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    bubbledIn: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    bubbledOut: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    notes: {
      type: DataTypes.STRING,
      allowNull: true
    }
  });
  return Cup;
};
