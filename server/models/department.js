'use strict';

module.exports = function(sequelize, DataTypes) {
  var Departments = sequelize.define('Departments', {
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
    }
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Departments;
};
