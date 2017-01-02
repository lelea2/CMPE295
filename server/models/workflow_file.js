'use strict';

module.exports = function(sequelize, DataTypes) {
  var WorkflowFiles = sequelize.define('WorkflowFiles', {
    id: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    workflow_id: {
      type: DataTypes.STRING,
      references: {
        model: 'Workflows', // Can be both a string representing the table name, or a reference to the model
        key: 'id'
      }
    },
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
