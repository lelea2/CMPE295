'use strict';

module.exports = function(sequelize, DataTypes) {
  var Workflows = sequelize.define('Workflows', {
    id: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    type_id: DataTypes.STRING,
    currentStateId: DataTypes.INTEGER,
    note: DataTypes.STRING,
    critical: DataTypes.ENUM('1','2','3','4','5'),
    due_date: DataTypes.DATE
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Workflows;
};
