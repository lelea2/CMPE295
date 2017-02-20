'use strict';

module.exports = function(sequelize, DataTypes) {
  var Notifications = sequelize.define('Notifications', {
    id: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    user_id: {
      type: DataTypes.STRING,
      references: {
        model: 'Users', // Can be both a string representing the table name, or a reference to the model
        key: 'id'
      }
    },
    task_id: DataTypes.STRING,
    task_type: DataTypes.ENUM('workflow', 'process'),
    notification_type: DataTypes.ENUM('created', 'assigned','unassigned','commented','contacted'),
    notification_message: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Notifications;
};
