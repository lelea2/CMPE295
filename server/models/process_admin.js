'use strict';

module.exports = function(sequelize, DataTypes) {
  var ProcessAdmin = sequelize.define('ProcessAdmin', {
    process_id: DataTypes.STRING,
    user_id: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
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

