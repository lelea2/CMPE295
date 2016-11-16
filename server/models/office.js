'use strict';

module.exports = function(sequelize, DataTypes) {
  var Offices = sequelize.define('Offices', {
    id: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    address: DataTypes.STRING,
    phone: DataTypes.STRING,
    group_email: {
      type: DataTypes.STRING,
      unique: true
    },
    unique_code: {
      type: DataTypes.STRING,
      unique: true
    },
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
  return Offices;
};
