'use strict';

module.exports = function(sequelize, DataTypes) {
  var Regions = sequelize.define('Regions', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false
    },
    zipcode: {
      type: DataTypes.STRING
    },
    office_id: {
      type: DataTypes.STRING,
      references: {
        model: 'Offices',
        key: 'id'
      }
    }
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        Regions.belongsTo(models.Offices, { foreignKey: 'office_id'});
      }
    }
  });
  return Regions;
};
