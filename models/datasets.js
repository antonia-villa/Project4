'use strict';
module.exports = (sequelize, DataTypes) => {
  var datasets = sequelize.define('datasets', {
    dataset_id: DataTypes.STRING,
    name: DataTypes.TEXT
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return datasets;
};