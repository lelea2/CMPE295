'use strict';

module.exports = function(sequelize, DataTypes) {
  var Permissions = sequelize.define('Permissions', {
    id: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    manage_member: DataTypes.BOOLEAN,
    manage_write: DataTypes.BOOLEAN, //create and update
    manage_read: DataTypes.BOOLEAN, //viewable
    manage_delete: DataTypes.BOOLEAN
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    },
    timestamp: false
  });
  return Permissions;
};
