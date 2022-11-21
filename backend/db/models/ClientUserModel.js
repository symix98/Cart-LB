"use strict";
module.exports = (sequelize, DataTypes) => {
  const ClientUser = sequelize.define(
    "clientuser",
    {
      cid: {
        type: DataTypes.UUID,
      },
      username: {
        type: DataTypes.TEXT,
        primaryKey: true,
        allowNull: false,
      },
      password: DataTypes.TEXT,
    },
    {
      paranoid: true,
      "tableName": 'clientuser',
    }
  );
  return ClientUser;
};
