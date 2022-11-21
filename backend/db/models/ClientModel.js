"use strict";
module.exports = (sequelize, DataTypes) => {
  const Client = sequelize.define(
    "client",
    {
      cid: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        // defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        autoIncrement: true,
      },
      cname: DataTypes.TEXT,
      cmid: DataTypes.TEXT,
      clast: DataTypes.TEXT,
      cphone: DataTypes.TEXT,
    },
    {
      paranoid: true,
      "freezeTableName": true,
      "tableName": 'client',
    }
  );
  return Client;
};
