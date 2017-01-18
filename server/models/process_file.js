'use strict';

module.exports = function(sequelize, DataTypes) {
  var ProcessFiles = sequelize.define('ProcessFiles', {
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
    filename: DataTypes.STRING,
    mimeType: DataTypes.STRING,
    file: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        ProcessFiles.belongsTo(models.Processes, { foreignKey: 'process_id' });
      }
    }
  });
  return ProcessFiles;
};
