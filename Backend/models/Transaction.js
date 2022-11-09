
"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Transaction extends Model {
        static associate(models) {}
    }
    Transaction.init(
        {
            txHash: {
                type: DataTypes.STRING(200),
                allowNull: false,
                primaryKey: true
            },

            chainId: {
                type: DataTypes.STRING(20),
                allowNull: false,
            },

            type: {
                type: DataTypes.STRING(30),
                allowNull: false,
            },
            status: {
                type: DataTypes.STRING(20),
                allowNull: false,
            },

            height: {
                type: DataTypes.INTEGER(30),
                allowNull: false,
            },
            gasUsed: {
                type: DataTypes.INTEGER(10),
                allowNull: false,
            },
            gasWanted: {
                type: DataTypes.INTEGER(10),
                allowNull: false,
            },
            memo: {
                type: DataTypes.STRING(20),
                allowNull: false,
                defaultValue: "",
            },
            fee: {
                type: DataTypes.INTEGER(20),
                allowNull: false,
            },


            time: {
                type: DataTypes.DATE(),
                allowNull: false,
            },

        },
        {
            sequelize,
            modelName: "Transaction",
            charset: "utf8",
            collate: "utf8_general_ci",
            underscored: true,
            timestamps: false
        }
    );
    Transaction.associate = function (models) {

    };
    return Transaction;
};


