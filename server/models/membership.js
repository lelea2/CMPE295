'use strict';

module.exports = function(sequelize, DataTypes) {
  var Memberships = sequelize.define('Memberships', {
    id: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    group_id: {
      type: DataTypes.STRING
    },
    group_type: DataTypes.ENUM('department', 'office'),
    role_id: DataTypes.INTEGER,
    permission_id: DataTypes.STRING,
    isAdmin: DataTypes.BOOLEAN
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Memberships;
};
