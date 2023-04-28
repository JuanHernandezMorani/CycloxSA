const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
  sequelize.define('group', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      defaultValue: "unknown",
    }
  },
  {
    timestamps: false
  });
};