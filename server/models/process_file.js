'use strict';

module.exports = function(sequelize, DataTypes) {
  var ProcessFiles = sequelize.define('ProcessFiles', {
    id: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    process_id: DataTypes.STRING,
    filename: DataTypes.STRING,
    mimeType: DataTypes.STRING,
    file: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return ProcessFiles;
};
