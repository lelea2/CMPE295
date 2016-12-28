'use strict';

module.exports = function(sequelize, DataTypes) {
  var WorkflowFiles = sequelize.define('WorkflowFiles', {
    id: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    workflow_id: DataTypes.STRING,
    filename: DataTypes.STRING,
    mimeType: DataTypes.STRING,
    file: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return WorkflowFiles;
};
