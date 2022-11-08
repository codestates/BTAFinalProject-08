
"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Block extends Model {
        static associate(models) {}
    }
    Block.init(
        {
            height: {
                type: DataTypes.INTEGER(30),
                allowNull: false,
                primaryKey: true
            },

            chainId: {
                type: DataTypes.STRING(50),
                allowNull: false,
            },
            hash: {
                type: DataTypes.STRING(50),
                allowNull: false,
            },

            round: {
                type: DataTypes.INTEGER(10),
                allowNull: false,
                defaultValue: 0,
            },

            proposerAddress: {
                type: DataTypes.STRING(50),
                allowNull: false,
            },
            numOfTx: {
                type: DataTypes.INTEGER(30),
                allowNull: false,
            },
            time: {
                type: DataTypes.DATE(),
                allowNull: false,
            },

        },
        {
            sequelize,
            modelName: "Block",
            charset: "utf8",
            collate: "utf8_general_ci",
            underscored: true,
            timestamps: false
        }
    );
    Block.associate = function (models) {
    };
    return Block;
};


