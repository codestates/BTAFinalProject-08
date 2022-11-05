require("dotenv").config();
const env = process.env;

const development = {
  username: process.env.DEV_MYSQL_USERNAME,
  password: process.env.DEV_MYSQL_PASSWORD,
  database: process.env.DEV_MYSQL_DATABASE,
  host: process.env.DEV_MYSQL_HOST,
  dialect: "mysql",
  logging: false,
  //port: env.MYSQL_PORT
};


module.exports = { development};