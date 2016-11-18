'use strict';

module.exports = function(sequelize, DataTypes) {
  var ProcessTypes = sequelize.define('ProcessTypes', {
    id: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    name: DataTypes.STRING,
    description: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return ProcessTypes;
};
