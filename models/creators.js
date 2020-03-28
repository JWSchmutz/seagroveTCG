module.exports = function(sequelize, DataTypes) {
  var Creator = sequelize.define(
    "Creator",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      store: {
        type: DataTypes.STRING,
        allowNull: false
      },
      discount: {
        type: DataTypes.STRING,
        allowNull: false
      },
      code: {
        type: DataTypes.STRING,
        allowNull: false
      },
      link: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    {
      timestamps: false
    }
  );
  return Creator;
};
