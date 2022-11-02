// const express = require("express");
// const bodyParser = require("body-parser");
// const cookieParser = require("cookie-parser");
// const cors = require("cors");
import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";


const app = express();
const PORT = process.env.PORT || 3000;


// api 통신을 위한 모듈 설정
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
// cors 에러를 잡아주기 위한 설정 -> 여기서는 로컬의 3000번 포트에대한 접근을 허용함
app.use(
    cors({
        origin: true,
        credentials: true,
        methods: ["GET", "POST", "PUT", "DELETE"],
    })
);


app.listen(PORT, async () => {
    console.log(`      🚀 HTTP Server is starting on ${PORT}`);
});