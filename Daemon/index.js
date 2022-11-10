const models = require("./models/index.js");
const {pushBlock, pushTransaction,subscribeTransaction} = require("./modules/daemonModules");
models.sequelize
    .sync()
    .then(async () => {
        console.log(" DB 연결 성공");
        await pushBlock();
        await pushTransaction();
    })
    .catch((err) => {
        console.log("연결 실패");
        console.log(err);
    });

