'use strict';

module.exports = function(sequelize, DataTypes) {
  var WorklowCustomer = sequelize.define('WorklowCustomers', {
    workflow_id: {
      type: DataTypes.STRING,
      references: {
        model: 'Workflows', // Can be both a string representing the table name, or a reference to the model
        key: 'id'
      }
    },
    customer_id: {
      type: DataTypes.STRING,
      references: {
        model: 'Customers', // Can be both a string representing the table name, or a reference to the model
        key: 'id'
      }
    }
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        WorklowCustomer.belongsTo(models.Workflows, { foreignKey: 'workflow_id' });
        WorklowCustomer.belongsTo(models.Customers, { foreignKey: 'customer_id' });
      }
    },
    timestamps: false
  });
  return WorklowCustomer;
};
