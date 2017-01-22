'use strict';

module.exports = function(sequelize, DataTypes) {
  var Memberships = sequelize.define('Memberships', {
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
    group_id: {
      type: DataTypes.STRING
    },
    group_type: DataTypes.ENUM('department', 'office'),
    role_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Roles', // Can be both a string representing the table name, or a reference to the model
        key: 'id'
      }
    },
    permission_id: {
      type: DataTypes.STRING,
      references: {
        model: 'Permissions', // Can be both a string representing the table name, or a reference to the model
        key: 'id'
      }
    }
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        Memberships.belongsTo(models.Users, { foreignKey: 'user_id'});
        Memberships.belongsTo(models.Roles, { foreignKey: 'role_id' });
        Memberships.belongsTo(models.Permissions, { foreignKey: 'permission_id' });
      }
    }
  });
  return Memberships;
};
