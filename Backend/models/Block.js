const Block = (sequelize, DataTypes) => {
    const Block = sequelize.define(
        "Block",
        {
            //id가 기본적으로 들어있다.
            email: {
                type: DataTypes.STRING(30),
                allowNull: false, //필수
                unique: true,
            },
            nickname: {
                type: DataTypes.STRING(30),
                allowNull: false,
            },
            password: {
                type: DataTypes.STRING(100),
                allowNull: false,
            },
        },
        {
            charset: "utf8",
            collate: "utf8_general_ci", // 한글 저장
        },
    );
    Block.associate = (db) => {

    };
    return Block;
};

export default Block;