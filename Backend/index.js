import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import db from './models/index.js';
import blockRoutes from "./routes/block.js";
import transactionRoutes from "./routes/transaction.js";


const app = express();
const PORT = process.env.PORT;


// api 통신을 위한 모듈 설정
app.use(cookieParser());
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


db.sequelize
    .sync()
    .then(() => {
        console.log(" DB 연결 성공");
    })
    .catch((err) => {
        console.log("연결 실패");
        console.log(err);
    });


app.listen(PORT, async () => {
    console.log(`      🚀 HTTP Server is starting on ${PORT}`);
});