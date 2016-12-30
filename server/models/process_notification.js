'use strict';

module.exports = function(sequelize, DataTypes) {
  var Process_Notifications = sequelize.define('Process_Notifications', {
    id: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    user_id: DataTypes.STRING,
    process_id: DataTypes.STRING,
    notification_type: DataTypes.ENUM('assigned','unassigned','commented','contacted'),
    notification_message: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Process_Notifications;
};
