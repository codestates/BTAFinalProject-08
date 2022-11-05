const express = require("express");
const bodyParser = require("body-parser");
const models = require("./models/index.js");

const app = express();
const PORT = process.env.PORT;

app.use(bodyParser.json({extended: true}));
app.use(bodyParser.urlencoded({extended: true}));


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
    console.log(`      🚀 HTTP Server is starting on ${PORT}`);
});