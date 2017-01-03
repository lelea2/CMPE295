'use strict';

module.exports = function(sequelize, DataTypes) {
  var ProcessTypes = sequelize.define('ProcessTypes', {
    id: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    department_id: {
      type: DataTypes.STRING,
      references: {
        model: 'Departments', // Can be both a string representing the table name, or a reference to the model
        key: 'id'
      }
    },
    type: DataTypes.ENUM('auto-approve', 'agent-approve', 'admin-approve')
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        ProcessTypes.belongsTo(models.Departments, { foreignKey: 'department_id'});
      }
    }
  });
  return ProcessTypes;
};
