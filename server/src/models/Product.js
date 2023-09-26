const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
  sequelize.define('product', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
    },
    price: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
    },
    description: {
      type: DataTypes.TEXT,
      defaultValue: "Description not found"
    },
    category: {
      type: DataTypes.STRING,
      defaultValue: "uncategorized"
    }
    ,
    official:{
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    hide: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    }
  },
  {
    timestamps: false
  });
};