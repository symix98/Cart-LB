"use strict";
module.exports = (sequelize, DataTypes) => {
    const Address = sequelize.define(
        "Address",
        {
            addrid: {
                type: DataTypes.BIGINT,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
            },
            addrdesc: DataTypes.STRING(100),
            addrcity: DataTypes.STRING(100),
            addrdetails: DataTypes.STRING,
            cid: DataTypes.BIGINT,
        },
        {
            paranoid: false,
            timestamps: false,
            "freezeTableName": true,
            "tableName": 'address',
        });
    return Address;
};
