import Sequelize from "sequelize";
import development from "../config/config.js"
import Block from "./Block.js";

const db = {};
const sequelize = new Sequelize(development.database, development.username, development.password, development);
db.User = Block(sequelize, Sequelize);
db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;