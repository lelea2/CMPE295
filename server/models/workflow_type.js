'use strict';

var JsonField = require('sequelize-json');

module.exports = function(sequelize, DataTypes) {
  var WorkflowTypes = sequelize.define('WorkflowTypes', {
    id: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    tag_id: {
      type: DataTypes.STRING,
      references: {
        model: 'Tags', // Can be both a string representing the table name, or a reference to the model
        key: 'id'
      }
    },
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    flows: JsonField(sequelize, 'WorkflowTypes', 'flows'),
    is_deleted: DataTypes.BOOLEAN
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        WorkflowTypes.belongsTo(models.Tags, { foreignKey: 'tag_id'});
      }
    }
  });
  return WorkflowTypes;
};
