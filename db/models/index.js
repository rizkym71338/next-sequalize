"use strict";

const fs = require("fs");
require("dotenv").config();
const path = require("path");
const Sequelize = require("sequelize");
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.js")[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
}
/* Custom handler for reading current working directory */
const models = process.cwd() + "/server/db/models/" || __dirname;

sequelize
  .authenticate()
  .then((response) => {
    console.log({
      message: "Database connected",
    });
  })
  .catch((err) => {
    console.error({
      message: "Unable to connect to the database",
      stack_trace: err.message,
    });
  });

fs.readdirSync(__dirname).filter((file) => {
  return (
    file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
  );
});
const files = require.context("./", false, /\.js$/i);
files.keys().forEach((key) => {
  if (key.includes("index")) {
    return;
  }
  const model = files(key)(sequelize, Sequelize.DataTypes);
  db[model.name] = model;
});

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
