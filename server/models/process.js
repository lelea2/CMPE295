'use strict';

module.exports = function(sequelize, DataTypes) {
  var Processes = sequelize.define('Processes', {
    id: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    workflow_id: DataTypes.STRING,
    enabled_flag: DataTypes.BOOLEAN,
    currentStateId: DataTypes.INTEGER,
    next_states: DataTypes.BLOB,
    process_type: DataTypes.STRING,
    critical: DataTypes.ENUM('1','2','3','4','5'),
    due_date: DataTypes.DATE
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Processes;
};

