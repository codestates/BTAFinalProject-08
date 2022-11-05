
"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Block extends Model {
        static associate(models) {}
    }
    Block.init(
        {

            proposer: {
                type: DataTypes.STRING(50),
                allowNull: false,
            },
            txs: {
                type: DataTypes.INTEGER(30),
                allowNull: false,
            },
            dateTime: {
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


