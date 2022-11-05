const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const models = require("./models/index.js");
const blockRoutes = require("./routes/block");
const transactionRoutes = require("./routes/transaction");
const {test} = require("./modules/parseBlockInfo");



const app = express();
const PORT = process.env.PORT;


// api 통신을 위한 모듈 설정
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({extended: true}));



//라우터 설정
app.use("/block", blockRoutes);
app.use("/transaction", transactionRoutes);

// cors 에러를 잡아주기 위한 설정 -> 여기서는 로컬의 4567 포트에대한 접근을 허용함
app.use(
    cors({
        origin: true,
        credentials: true,
        methods: ["GET", "POST", "PUT", "DELETE"],
    })
);


models.sequelize
    .sync()
    .then(() => {
        console.log(" DB 연결 성공");
    })
    .catch((err) => {
        console.log("연결 실패");
        console.log(err);
    });


app.listen(PORT, async () => {
    await test()
    console.log(`      🚀 HTTP Server is starting on ${PORT}`);
});