'use strict';

module.exports = function(sequelize, DataTypes) {
  var Processes = sequelize.define('Processes', {
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
    enabled_flag: DataTypes.BOOLEAN,
    currentStateId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'StateTypes', // Can be both a string representing the table name, or a reference to the model
        key: 'id'
      }
    },
    block_states: DataTypes.BLOB,
    process_type: {
      type: DataTypes.STRING,
      references: {
        model: 'ProcessTypes', // Can be both a string representing the table name, or a reference to the model
        key: 'id'
      }
    },
    office_id: {
      type: DataTypes.STRING,
      references: {
        model: 'Offices', // Can be both a string representing the table name, or a reference to the model
        key: 'id'
      }
    },
    critical: DataTypes.ENUM('1','2','3','4','5'),
    due_date: DataTypes.DATE,
    details: DataTypes.BLOB //Include all schema detail for certain task
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        Processes.belongsTo(models.ProcessTypes, { foreignKey: 'process_type' });
        Processes.belongsTo(models.Workflows, { foreignKey: 'workflow_id' });
        Processes.belongsTo(models.StateTypes, { foreignKey: 'currentStateId' });
        Processes.belongsTo(models.Offices, { foreignKey: 'office_id' });
      }
    }
  });
  return Processes;
};

