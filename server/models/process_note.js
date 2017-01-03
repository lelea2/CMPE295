'use strict';

module.exports = function(sequelize, DataTypes) {
  var ProcessNotes = sequelize.define('ProcessNotes', {
    id: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    process_id: {
      type: DataTypes.STRING,
      references: {
        model: 'Processes', // Can be both a string representing the table name, or a reference to the model
        key: 'id'
      }
    },
    creator_id: {
      type: DataTypes.STRING,
      references: {
        model: 'Users', // Can be both a string representing the table name, or a reference to the model
        key: 'id'
      }
    },
    note: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        ProcessNotes.belongsTo(models.Processes, { foreignKey: 'process_id' });
        ProcessNotes.belongsTo(models.Users, { foreignKey: 'creator_id' });
      }
    }
  });
  return ProcessNotes;
};
