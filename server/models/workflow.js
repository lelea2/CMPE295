'use strict';

module.exports = function(sequelize, DataTypes) {
  var Workflows = sequelize.define('Workflows', {
    id: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    type_id: {
      type: DataTypes.STRING,
      references: {
        model: 'WorkflowTypes', // Can be both a string representing the table name, or a reference to the model
        key: 'id'
      }
    },
    currentStateId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'StateTypes', // Can be both a string representing the table name, or a reference to the model
        key: 'id'
      }
    },
    note: DataTypes.STRING,
    critical: DataTypes.ENUM('1','2','3','4','5'),
    due_date: DataTypes.DATE,
    longitude: DataTypes.DECIMAL(10, 2),
    latitude: DataTypes.DECIMAL(10, 2)
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        Workflows.belongsTo(models.WorkflowTypes, { foreignKey: 'type_id'});
        Workflows.belongsTo(models.StateTypes, { foreignKey: 'currentStateId'});
      }
    }
  });
  return Workflows;
};
