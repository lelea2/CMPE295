'use strict';

module.exports = function(sequelize, DataTypes) {
  var ProcessAdmin = sequelize.define('ProcessAdmin', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true
    },
    process_id: {
      type: DataTypes.STRING,
      references: {
        model: 'Processes', // Can be both a string representing the table name, or a reference to the model
        key: 'id'
      }
    },
    user_id: {
      type: DataTypes.STRING,
      references: {
        model: 'Users', // Can be both a string representing the table name, or a reference to the model
        key: 'id'
      }
    },
    office_id: {
      type: DataTypes.STRING,
      references: {
        model: 'Offices', // Can be both a string representing the table name, or a reference to the model
        key: 'id'
      }
    }
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        ProcessAdmin.belongsTo(models.Processes, { foreignKey: 'process_id' });
        ProcessAdmin.belongsTo(models.Users, { foreignKey: 'user_id' });
      }
    },
    timestamps: false,
    freezeTableName: true,
    // define the table's name
    tableName: 'ProcessAdmin',
    // don't delete database entries but set the newly added attribute deletedAt
    // to the current date (when deletion was done). paranoid will only work if
    // timestamps are enabled
    paranoid: true
  });
  return ProcessAdmin;
};
