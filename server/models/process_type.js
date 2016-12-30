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
    }
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return ProcessTypes;
};
