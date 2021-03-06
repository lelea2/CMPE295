'use strict';

module.exports = function(sequelize, DataTypes) {
  var Tags = sequelize.define('Tags', {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true
    },
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    keywords: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    },
    timestamps: false
  });
  return Tags;
};
