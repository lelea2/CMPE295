'use strict';

module.exports = function(sequelize, DataTypes) {
  var StateTypes = sequelize.define('StateTypes', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true
    },
    name: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    },
    timestamp: false
  });
  return StateTypes;
};
